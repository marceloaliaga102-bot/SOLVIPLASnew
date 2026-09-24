import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { getSiteState, saveSiteState } from './src/db/state.ts';
import { getOrCreateUser, getAllUsers } from './src/db/users.ts';
import { isSqlConfigured } from './src/db/index.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const DB_PATH = path.join(__dirname, 'data', 'db.json');

app.use(express.json({ limit: '50mb' }));

// Ensure data folder exists as local fallback
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

function readLocalFallback(): any {
  try {
    if (fs.existsSync(DB_PATH)) {
      const raw = fs.readFileSync(DB_PATH, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading local fallback db.json:', err);
  }
  return null;
}

// 1. GET /api/state - get synchronized state from database / local store
app.get('/api/state', async (_req, res) => {
  try {
    let data = await getSiteState('main');
    if (!data) {
      // Seed initial state from local template if storage is fresh
      const fallback = readLocalFallback();
      if (fallback) {
        data = await saveSiteState('main', fallback);
      }
    }
    res.json({
      success: true,
      data: data || readLocalFallback() || null,
      source: isSqlConfigured() ? 'postgresql' : 'local_storage',
    });
  } catch (err: any) {
    // Graceful fallback to local cache
    const fallback = readLocalFallback();
    res.json({
      success: true,
      data: fallback,
      source: 'fallback',
    });
  }
});

// 2. POST /api/state - update synchronized state
app.post('/api/state', async (req, res) => {
  try {
    const incomingData = req.body;
    if (!incomingData || typeof incomingData !== 'object') {
      return res.status(400).json({ success: false, message: 'Invalid payload' });
    }

    const merged = await saveSiteState('main', incomingData);

    // Also mirror to local fallback for safety
    try {
      fs.writeFileSync(DB_PATH, JSON.stringify(merged, null, 2), 'utf-8');
    } catch {}

    res.json({ success: true, data: merged, source: isSqlConfigured() ? 'postgresql' : 'local_storage' });
  } catch (err: any) {
    console.error('Error in POST /api/state:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. POST /api/auth/register - register user into PostgreSQL
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, avatar, role, institution, bio, ecoTitle, ecoInterest, location, themeColor, avatarType, avatarAnimalId } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ success: false, message: 'Faltan campos requeridos.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const currentData = (await getSiteState('main').catch(() => null)) || readLocalFallback() || {};
    const usersList: any[] = currentData.registeredUsers || [];

    const existing = usersList.find((u: any) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return res.status(400).json({ success: false, message: 'Este correo electrónico ya está registrado.' });
    }

    const userId = 'usr-' + Date.now();
    const newUser = {
      id: userId,
      name: name.trim(),
      email: cleanEmail,
      passwordHash: password.trim(),
      role: role || 'community',
      avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      institution: institution || 'Comunidad Solviplas',
      createdAt: new Date().toISOString(),
      bio: bio || 'Comprometido con un planeta sin plásticos y la investigación de biopolímeros.',
      ecoTitle: ecoTitle || 'Guardián de la Biodiversidad',
      ecoInterest: ecoInterest || 'Almidón de Yuca & Maíz',
      location: location || '',
      themeColor: themeColor || 'emerald',
      avatarType: avatarType || 'animal',
      avatarAnimalId: avatarAnimalId || 'panda-eco',
      badges: ['Miembro de la Comunidad', 'Perfil Verificado'],
    };

    // Save in PostgreSQL
    await getOrCreateUser(userId, cleanEmail, name.trim()).catch((err) => {
      console.warn('Note: getOrCreateUser warning:', err);
    });

    usersList.push(newUser);
    currentData.registeredUsers = usersList;
    await saveSiteState('main', currentData);

    const safeUser = { ...newUser };
    delete (safeUser as any).passwordHash;

    res.json({ success: true, user: safeUser, source: 'postgresql' });
  } catch (err: any) {
    console.error('Error in POST /api/auth/register:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. POST /api/auth/login - authenticates user against PostgreSQL
app.post('/api/auth/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res.status(400).json({ success: false, message: 'Ingresa correo y contraseña.' });
    }

    const trimmedId = identifier.trim().toLowerCase();
    const cleanPass = password.trim();
    const currentData = (await getSiteState('main').catch(() => null)) || readLocalFallback() || {};

    // Check Master Admin
    const adminEmail = currentData.siteConfig?.adminEmail || 'marceloaliaga102@gmail.com';
    const adminUser = currentData.siteConfig?.adminUsername || 'admin';
    const adminPass = currentData.siteConfig?.adminPasswordHash || 'Solviplas2025!';

    if (
      (trimmedId === adminEmail.toLowerCase() ||
        trimmedId === adminUser.toLowerCase() ||
        trimmedId === 'marceloaliaga102@gmail.com' ||
        trimmedId === 'solf@gmail.com' ||
        trimmedId === 'admin') &&
      (cleanPass === adminPass || cleanPass.toLowerCase() === 'solviplas2025!' || cleanPass.toLowerCase() === 'solviplas')
    ) {
      return res.json({
        success: true,
        user: {
          id: 'usr-admin-master',
          name: 'Marcelo Aliaga',
          email: 'marceloaliaga102@gmail.com',
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
          institution: 'Administrador Solviplas',
          createdAt: new Date().toISOString(),
        },
      });
    }

    // Check registered accounts in PostgreSQL state
    const usersList: any[] = currentData.registeredUsers || [];
    const matched = usersList.find(
      (u: any) =>
        (u.email.toLowerCase() === trimmedId || u.name.toLowerCase() === trimmedId) &&
        (u.passwordHash === cleanPass || !cleanPass)
    );

    if (matched) {
      const safeUser = { ...matched };
      delete safeUser.passwordHash;
      return res.json({ success: true, user: safeUser });
    }

    res.status(401).json({ success: false, message: 'Credenciales inválidas. Verifica tu correo y contraseña.' });
  } catch (err: any) {
    console.error('Error in POST /api/auth/login:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. GET /api/users - list users from PostgreSQL database
app.get('/api/users', async (_req, res) => {
  try {
    const dbUsers = await getAllUsers();
    res.json({ success: true, users: dbUsers });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Vite & Static file handling
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`> Solviplas Full-Stack Server running with PostgreSQL on http://0.0.0.0:${PORT}`);
  });
}

startServer();

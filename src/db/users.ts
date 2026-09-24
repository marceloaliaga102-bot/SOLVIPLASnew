import { db, isSqlConfigured } from './index.ts';
import { users } from './schema.ts';
import { getSiteState } from './state.ts';

export async function getOrCreateUser(uid: string, email: string, name?: string) {
  if (db && isSqlConfigured()) {
    try {
      const result = await db.insert(users)
        .values({
          uid,
          email,
          name: name || email.split('@')[0],
        })
        .onConflictDoUpdate({
          target: users.uid,
          set: {
            email,
            ...(name ? { name } : {}),
          },
        })
        .returning();

      return result[0];
    } catch (error: any) {
      console.warn("Notice: PostgreSQL user upsert warning:", error?.message);
    }
  }

  return {
    uid,
    email,
    name: name || email.split('@')[0],
    role: 'community',
    createdAt: new Date(),
  };
}

export async function getAllUsers() {
  if (db && isSqlConfigured()) {
    try {
      return await db.select().from(users);
    } catch (error: any) {
      console.warn("Notice: PostgreSQL user query warning:", error?.message);
    }
  }

  try {
    const state = await getSiteState('main');
    const registered = state?.registeredUsers || [];
    return registered.map((u: any, idx: number) => ({
      id: idx + 1,
      uid: u.id || `usr-${idx}`,
      email: u.email || '',
      name: u.name || '',
      role: u.role || 'community',
      avatar: u.avatar || null,
      institution: u.institution || null,
      bio: u.bio || null,
      ecoTitle: u.ecoTitle || null,
      location: u.location || null,
      themeColor: u.themeColor || 'emerald',
      createdAt: u.createdAt ? new Date(u.createdAt) : new Date(),
    }));
  } catch {
    return [];
  }
}


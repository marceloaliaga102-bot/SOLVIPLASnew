import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { db, isSqlConfigured } from './index.ts';
import { siteState } from './schema.ts';
import { eq } from 'drizzle-orm';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_JSON_PATH = path.resolve(__dirname, '../../data/db.json');

function readJsonState(): Record<string, any> | null {
  try {
    if (fs.existsSync(DB_JSON_PATH)) {
      const content = fs.readFileSync(DB_JSON_PATH, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.warn('Notice: Error reading db.json storage:', err);
  }
  return null;
}

function writeJsonState(state: Record<string, any>): void {
  try {
    const dir = path.dirname(DB_JSON_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_JSON_PATH, JSON.stringify(state, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Notice: Error writing db.json storage:', err);
  }
}

/**
 * Retrieve global site state
 */
export async function getSiteState(key: string = 'main'): Promise<any | null> {
  // If PostgreSQL is configured, attempt query
  if (db && isSqlConfigured()) {
    try {
      const rows = await db.select().from(siteState).where(eq(siteState.key, key));
      if (rows.length > 0 && rows[0].stateJson) {
        return JSON.parse(rows[0].stateJson);
      }
    } catch (error: any) {
      console.warn('Notice: PostgreSQL state query failed, using local persistent store:', error?.message);
    }
  }

  return readJsonState();
}

/**
 * Persist/merge global site state
 */
export async function saveSiteState(key: string = 'main', stateData: Record<string, any>): Promise<any> {
  const existing = (await getSiteState(key)) || {};
  const merged = { ...existing, ...stateData, lastUpdatedAt: new Date().toISOString() };

  // Always persist locally to db.json
  writeJsonState(merged);

  // If PostgreSQL is configured, also persist to database table
  if (db && isSqlConfigured()) {
    try {
      const jsonString = JSON.stringify(merged);
      await db.insert(siteState)
        .values({
          key,
          stateJson: jsonString,
          updatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: siteState.key,
          set: {
            stateJson: jsonString,
            updatedAt: new Date(),
          },
        });
    } catch (error: any) {
      console.warn('Notice: PostgreSQL state update warning:', error?.message);
    }
  }

  return merged;
}


import { Capacitor } from '@capacitor/core'
import {
  CapacitorSQLite,
  SQLiteConnection,
  type SQLiteDBConnection,
} from '@capacitor-community/sqlite'

const DATABASE_NAME = 'mealbridge'
const DATABASE_VERSION = 1

const sqlite = new SQLiteConnection(CapacitorSQLite)

let database: SQLiteDBConnection | null = null

const schema = `
  CREATE TABLE IF NOT EXISTS app_metadata (
    key TEXT PRIMARY KEY NOT NULL,
    value TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS household_members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age_group TEXT,
    dietary_notes TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    servings INTEGER NOT NULL DEFAULT 4,
    preparation_minutes INTEGER,
    cooking_minutes INTEGER,
    ingredients_json TEXT NOT NULL DEFAULT '[]',
    instructions_json TEXT NOT NULL DEFAULT '[]',
    is_favourite INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS meal_plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    meal_date TEXT NOT NULL,
    meal_type TEXT NOT NULL,
    recipe_id INTEGER,
    custom_title TEXT,
    servings INTEGER NOT NULL DEFAULT 4,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id)
  );

  CREATE TABLE IF NOT EXISTS pantry_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    quantity REAL,
    unit TEXT,
    expiry_date TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS shopping_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    quantity REAL,
    unit TEXT,
    category TEXT,
    estimated_price REAL,
    is_checked INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`

export async function initialiseDatabase(): Promise<void> {
  if (Capacitor.getPlatform() === 'web') {
    console.info(
      'MealBridge SQLite is configured for the native Android application.',
    )
    return
  }

  const consistency = await sqlite.checkConnectionsConsistency()
  const existingConnection = await sqlite.isConnection(
    DATABASE_NAME,
    false,
  )

  if (consistency.result && existingConnection.result) {
    database = await sqlite.retrieveConnection(DATABASE_NAME, false)
  } else {
    database = await sqlite.createConnection(
      DATABASE_NAME,
      false,
      'no-encryption',
      DATABASE_VERSION,
      false,
    )
  }

  await database.open()
  await database.execute(schema)

  const now = new Date().toISOString()

  await database.run(
    `
      INSERT OR REPLACE INTO app_metadata (key, value, updated_at)
      VALUES (?, ?, ?)
    `,
    ['database_version', String(DATABASE_VERSION), now],
  )
}

export function getDatabase(): SQLiteDBConnection {
  if (!database) {
    throw new Error('MealBridge database has not been initialised.')
  }

  return database
}

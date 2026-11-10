import * as SQLite from "expo-sqlite";

// Ouvre ou crée la base de données SQLite de l'application
export const db = SQLite.openDatabaseSync("akanybudget.db");

export function initDatabase() {
  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS user (
        id TEXT PRIMARY KEY NOT NULL ,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS verificationCode (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code NUMBER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Base de données initialisée avec succès.");
  } catch (error) {
    console.error(
      "Erreur lors de l’initialisation de la base de données :",
      error,
    );
  }
}

export function deleteDatabase() {
  try {
    db.execSync("DROP TABLE IF EXISTS user;");
    db.execSync("DROP TABLE IF EXISTS verificationCode;");
    console.log("Base de données supprimée avec succès.");
  } catch (error) {
    console.error(
      "Erreur lors de la suppression de la base de données :",
      error,
    );
  }
}

export default db;

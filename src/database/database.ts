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
        code REAL NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS budget (
        id TEXT PRIMARY KEY NOT NULL,
        id_user TEXT NOT NULL,
        label TEXT NOT NULL,
        icon_background_color TEXT NOT NULL,
        icon TEXT NOT NULL,
        monthly_amount REAL NOT NULL,
        unit_amount REAL NOT NULL,
        unit INTEGER NOT NULL,
        number INTEGER NOT NULL,
        status TEXT NOT NULL,
        period TEXT NOT NULL,
        limit_type TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_user) REFERENCES user(id)
      );

      CREATE TABLE IF NOT EXISTS source (
        id TEXT PRIMARY KEY NOT NULL,
        id_user TEXT NOT NULL,
        label TEXT NOT NULL,
        description TEXT NOT NULL,
        icon_url  TEXT NOT NULL,
        status INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_user) REFERENCES user(id)
      );

      CREATE TABLE IF NOT EXISTS operation (
        id TEXT PRIMARY KEY NOT NULL,
        id_user TEXT NOT NULL,
        id_source TEXT NOT NULL,
        id_budget TEXT NOT NULL,
        type_operation TEXT NOT NULL,
        amount REAL NOT NULL,
        date  TEXT NOT NULL,
        description TEXT NOT NULL,
        from_transfert TEXT NOT NULL,
        to_transfert TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_user) REFERENCES user(id),
        FOREIGN KEY (id_source) REFERENCES source(id),
        FOREIGN KEY (id_budget) REFERENCES budget(id)
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
    db.execSync("DROP TABLE IF EXISTS budget;");
    db.execSync("DROP TABLE IF EXISTS source;");
    db.execSync("DROP TABLE IF EXISTS operation;");
    console.log("Base de données supprimée avec succès.");
  } catch (error) {
    console.error(
      "Erreur lors de la suppression de la base de données :",
      error,
    );
  }
}

export default db;

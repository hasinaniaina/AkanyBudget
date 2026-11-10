import db from "@/database/database";
import { verificationCode } from "@/models/codeVerification";
import { User } from "@/models/user";

/**
 * Insère un nouveau code de vérification dans la base de données SQLite
 */
export function insertVerificationCode(code: string): boolean {
  try {
    const statement = db.prepareSync(
      "INSERT INTO verificationCode (code) VALUES (?);",
    );

    statement.executeSync([code]);
    statement.finalizeSync();

    console.log("Code de vérification inséré avec succès !");
    return true;
  } catch (error) {
    console.error(
      "Erreur lors de l'insertion du code de vérification :",
      error,
    );
    return false;
  }
}

/**
 * Récupère le dernier code de vérification inséré dans la base de données SQLite
 */
export function getLastVerificationCode(): string | null {
  try {
    const result: verificationCode | null = db.getFirstSync(
      "SELECT code FROM verificationCode ORDER BY id DESC LIMIT 1;",
    );
    return result ? result.code! : null;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du dernier code de vérification :",
      error,
    );
    return null;
  }
}

/** Supprime le dernier code de vérification inséré dans la base de données SQLite */
export function deleteLastVerificationCode(): boolean {
  try {
    const statement = db.prepareSync(
      `DELETE FROM verificationCode WHERE id IN (
         SELECT id FROM verificationCode ORDER BY id DESC LIMIT 1
       );`,
    );
    statement.executeSync();

    console.log("Dernier code de vérification supprimé avec succès !");
    return true;
  } catch (error) {
    console.error(
      "Erreur lors de la suppression du dernier code de vérification :",
      error,
    );
    return false;
  }
}

/**
 * Insère un nouvel utilisateur dans la base de données SQLite
 */
export function insertUser(user: User): boolean {
  try {
    const statement = db.prepareSync(
      "INSERT INTO user (id, name, phone, email, password) VALUES (?, ?, ?, ?, ?)",
    );

    statement.executeSync([
      user.id!,
      user.name,
      user.phone,
      user.email,
      user.password,
    ]);
    statement.finalizeSync();

    console.log("Utilisateur inséré avec succès !");
    return true;
  } catch (error) {
    console.error("Erreur lors de l'insertion de l'utilisateur :", error);
    return false;
  }
}

/**
 * Récupère tous les utilisateurs (pour vérification)
 */
export function getAllUsers(): User[] {
  try {
    const users = db.getAllSync("SELECT * FROM user;");
    return users as User[];
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    return [];
  }
}

/**
 * Changer le mots de passe de l'utilisateur si ce dernier est perdu (pour vérification)
 */
export function updatePasswordByEmail(
  email: string,
  newPasswordHash: string,
): boolean {
  try {
    const statement = db.prepareSync(
      `UPDATE user SET password = ? WHERE email = ?;`,
    );
    const result = statement.executeSync([newPasswordHash, email]);
    statement.finalizeSync();

    return result.changes > 0;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du mot de passe :", error);
    return false;
  }
}

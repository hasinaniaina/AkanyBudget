import db from "@/database/database";
import { Budget } from "@/models/budget";

/**
 * Insère un nouvel utilisateur dans la base de données SQLite
 */
export function insertBudget(budget: Budget): boolean {
  try {
    const statement = db.prepareSync(
      `INSERT INTO budget (id, label, icon_background_color, 
      icon, monthly_amount, unit_amount, unit, number, status, period, limit_type, id_user)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    );

    statement.executeSync([
      budget.id!,
      budget.label,
      budget.icon_background_color,
      String(budget.icon),
      budget.monthly_amount,
      budget.unit_amount,
      budget.unit,
      budget.number,
      String(budget.status),
      budget.period,
      budget.limit_type,
      budget.id_user!,
    ]);
    statement.finalizeSync();

    console.log("Budget inséré avec succès !");
    return true;
  } catch (error) {
    console.error("Erreur lors de l'insertion de l'utilisateur :", error);
    return false;
  }
}

export function getAllBudget(): Budget[] {
  try {
    const sources = db.getAllSync(
      "SELECT * FROM budget ORDER BY created_at DESC;",
    );
    return sources as Budget[];
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    return [];
  }
}

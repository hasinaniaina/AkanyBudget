import db from "@/database/database";
import { Source } from "@/models/source";

export function insertSource(source: Source): boolean {
  try {
    const statement = db.prepareSync(
      "INSERT INTO source (id, label, description, icon_url, status) VALUES (?, ?, ?, ?, ?)",
    );

    statement.executeSync([
      source.id!,
      source.label,
      source.description,
      source.icon_url,
      String(source.status),
    ]);
    statement.finalizeSync();

    console.log("Source inséré avec succès !");
    return true;
  } catch (error) {
    console.error("Erreur lors de l'insertion de la source :", error);
    return false;
  }
}

export function getAllSources(): Source[] {
  try {
    const sources = db.getAllSync("SELECT * FROM source;");
    return sources as Source[];
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    return [];
  }
}

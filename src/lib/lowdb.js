import { JSONFilePreset } from "lowdb/node";

// Skapa eller läs db.json med standarddata
const defaultData = { snippets: [] };
const db = await JSONFilePreset("db.json", defaultData);

// Exportera databasen
export default db;

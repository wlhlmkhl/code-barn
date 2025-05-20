import { JSONFilePreset } from "lowdb/node";

// Create or read db.json with default data
const defaultData = { snippets: [] };
const db = await JSONFilePreset("db.json", defaultData);

// Export the database
export default db;

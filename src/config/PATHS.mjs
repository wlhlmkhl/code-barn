import path from "node:path";

export const ROOT = process.cwd();
export const CODEBARN = path.join(ROOT, "codebarn");
export const IN_FOLDER = path.join(CODEBARN, "in");
export const OUT_FOLDER = path.join(CODEBARN, "out");
export const DB_FILE = path.join(ROOT, "db.json");

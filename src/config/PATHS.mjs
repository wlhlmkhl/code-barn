import path from "node:path";

// The root directory of the project.
export const ROOT = process.cwd();

// The main codebarn folder.
export const CODEBARN = path.join(ROOT, "codebarn");

// The input folder where files are read from.
export const IN_FOLDER = path.join(CODEBARN, "in");

// The output folder where files are written to.
export const OUT_FOLDER = path.join(CODEBARN, "out");

// The path to the database file.
export const DB_FILE = path.join(ROOT, "db.json");

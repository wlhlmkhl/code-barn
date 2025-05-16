import fs from "fs";
import { CODEBARN, IN_FOLDER, OUT_FOLDER } from "../config/PATHS.mjs";

// Skapa en mapp om den inte redan finns
function ensureFolderExists(folderPath, folderName) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    console.log(`Mappen "${folderName}" har skapats.`);
  } else {
    console.log(`Mappen "${folderName}" finns redan.`);
  }
}

// Huvudfunktion för att skapa huvudmapp och undermappar
export default function createFolder() {
  ensureFolderExists(CODEBARN, "codebarn");
  ensureFolderExists(IN_FOLDER, "in");
  ensureFolderExists(OUT_FOLDER, "out");
}

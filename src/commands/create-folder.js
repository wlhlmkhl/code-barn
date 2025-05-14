// Importerar Node.js inbyggda moduler
import fs from "fs"; // För att hantera filsystemet (skapa mappar, kolla om de finns)
import path from "node:path"; // För att bygga sökvägar på ett plattformsoberoende sätt
import { fileURLToPath } from "url"; // För att konvertera import.meta.url till en filväg

// Konverterar import.meta.url till __filename och __dirname
const __filename = fileURLToPath(import.meta.url); // Fullständig sökväg till denna fil
const __dirname = path.dirname(__filename); // Mappens sökväg där denna fil ligger

// Exporterar funktionen så att den kan användas i andra filer
export default function createFolder() {
  // Namnet på mappar som ska skapas
  const mainfolder = "codebarn";
  const subfolders = ["in", "out"];

  // Skapar en fullständig sökväg till mappen baserat på var användaren står i terminalen
  const targetPath = path.join(process.cwd(), mainfolder);

  // Kollar om mappen redan finns
  if (!fs.existsSync(targetPath)) {
    // Om inte, skapa mappen
    fs.mkdirSync(targetPath);
    // Skriv ut ett meddelande om att mappen skapades
    console.log(` Mappen "${mainfolder}" har skapats.`);
  } else {
    // Om mappen redan finns, informera användaren
    console.log(` Mappen "${mainfolder}" finns redan.`);
  } // Skapa varje undermapp om den inte redan finns

  subfolders.forEach((subfolder) => {
    const subfolderPath = path.join(targetPath, subfolder);
    if (!fs.existsSync(subfolderPath)) {
      fs.mkdirSync(subfolderPath);
      console.log(` Undermapp "${subfolder}" har skapats.`);
    } else {
      console.log(` Undermapp "${subfolder}" finns redan.`);
    }
  });
}

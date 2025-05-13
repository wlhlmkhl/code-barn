import path from "node:path"; // För att bygga sökvägar på ett plattformsoberoende sätt
import fs from "node:fs";
import { addNewPost } from "../utils/utils.mjs";

function readFileContent(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return content;
  } catch (error) {
    console.error("Failed to read file:", error);
    return null;
  }
}
function readFolderContent(folderPath) {
  try {
    const fileNames = fs.readdirSync(folderPath);
    if (fileNames.length === 0) {
      throw new Error("The directory is empty.");
    }
    return fileNames;
  } catch (error) {
    console.error("Failed to read directory:", error);
    return [];
  }
}

function deleteFile(filePath) {
  try {
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error("Failed to delete file:", error);
  }
}

export default async function copyFileToDataBase() {
  const targetPath = path.join(process.cwd(), "codebarn", "In");
  const fileNames = readFolderContent(targetPath);
  fileNames.forEach((fileName) => {
    const filePath = path.join(targetPath, fileName);
    const content = readFileContent(filePath);
    addNewPost(fileName, content);
    deleteFile(filePath);
  });
}

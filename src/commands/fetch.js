import path from "path";
import { getPosts, getPostById } from "../utils/utils.mjs";
import fs from "fs";

const folderPath = path.join(process.cwd(), "codebarn", "Out");

function createFile(folder, fileName, content) {
  const targetPath = path.join(folder, fileName);
  try {
    fs.writeFileSync(targetPath, content);
  } catch (error) {
    console.error(`Failed to create file at "${targetPath}":`, error.message);
  }
}

export function fetchAll() {
  const data = getPosts();
  if (!data || data.length === 0) {
    console.log("CodeBarn is empty.");
  }
  data.forEach((item) => createFile(folderPath, item.title, item.code));
}

export function fetchById(id) {
  const file = getPostById(id);
  createFile(folderPath, file.title, file.code);
}

import path from "path";
import { getPosts } from "../utils/utils.mjs";
import fs from "fs";

function createFile(folder, fileName, content) {
  const targetPath = path.join(folder, fileName);
  try {
    fs.writeFileSync(targetPath, content);
  } catch (error) {
    console.error(`Failed to create file at "${targetPath}":`, error.message);
  }
}

export default function fetchAll() {
  const data = getPosts();
  if (!data || data.length === 0) {
    console.log("CodeBarn is empty.");
  }
  const folderPath = path.join(process.cwd(), "codebarn", "Out");
  console.log(folderPath);
  data.forEach((item) => createFile(folderPath, item.title, item.code));
}

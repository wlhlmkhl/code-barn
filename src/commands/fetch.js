import path from "path";
import { getPosts, getPostById, createFile } from "../utils/utils.mjs";

const folderPath = path.join(process.cwd(), "codebarn", "Out");

export function fetchAll() {
  const data = getPosts();
  if (!data || data.length === 0) {
    console.log("CodeBarn is empty.");
  }
  data.forEach((file) =>
    createFile(folderPath, file.title, file.code, file.id)
  );
}

export function fetchById(id) {
  const file = getPostById(id);
  createFile(folderPath, file.title, file.code, file.id);
}

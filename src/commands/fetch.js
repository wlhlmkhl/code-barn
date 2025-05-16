import { OUT_FOLDER } from "../config/PATHS.mjs";
import { getPosts, getPostById, createFile } from "../utils/utils.mjs";

const folderPath = OUT_FOLDER;

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

import { IN_FOLDER } from "../config/PATHS.mjs";
import {
  addNewPost,
  readFolderContent,
  readFileContent,
  deleteFile,
} from "../utils/utils.mjs";

export async function copyFiles() {
  const targetPath = IN_FOLDER;
  const fileNames = readFolderContent(targetPath);
  fileNames.forEach((fileName) => {
    const filePath = path.join(targetPath, fileName);
    const content = readFileContent(filePath);
    addNewPost(fileName, content);
    deleteFile(filePath);
  });
}

import path from "node:path";
import ora from "ora";
import chalk from "chalk";

import { IN_FOLDER } from "../config/PATHS.mjs";
import {
  addNewPost,
  readFolderContent,
  readFileContent,
  deleteFile,
} from "../utils/utils.mjs";

// Copies all files from the input folder to the database and deletes them from the folder.
export const copyFiles = async () => {
  const spinner = ora("Copying files to the database...").start();
  try {
    const targetPath = IN_FOLDER;
    const fileNames = readFolderContent(targetPath);
    for (const fileName of fileNames) {
      const filePath = path.join(targetPath, fileName);
      const content = readFileContent(filePath);
      await addNewPost(fileName, content);
      deleteFile(filePath);
    }
    spinner.succeed(chalk.green("All files have been copied to the database!"));
  } catch (error) {
    spinner.fail("An error occurred while copying files.");
    console.error(error);
  }
};

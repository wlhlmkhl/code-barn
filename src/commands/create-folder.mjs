import fs from "fs";
import { CODEBARN, IN_FOLDER, OUT_FOLDER } from "../config/PATHS.mjs";
import ora from "ora";
import chalk from "chalk";

// Create folder if it does not exist
const ensureFolderExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
};

// Main function to create folders
const createFolder = () => {
  const spinner = ora("Creating folders...").start();
  try {
    ensureFolderExists(CODEBARN);
    ensureFolderExists(IN_FOLDER);
    ensureFolderExists(OUT_FOLDER);
    spinner.succeed(chalk.green("All folders checked/created."));
  } catch (error) {
    spinner.fail(chalk.red("Failed to create folders."));
    throw error;
  }
};

export default createFolder;

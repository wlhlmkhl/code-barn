import fs from "fs";
import path from "path";
import chalk from "chalk";
import ora from "ora";
import { CODEBARN } from "../config/PATHS.mjs";

const cleanup = () => {
  const spinner = ora("Cleaning up folder...").start();

  if (fs.existsSync(CODEBARN)) {
    fs.rmSync(CODEBARN, { recursive: true, force: true });
    spinner.info(chalk.green(`🧹 Removed folder: codebarn`));
  } else {
    spinner.info(chalk.gray(`(No folder found: codebarn)`));
  }

  spinner.succeed("✅ Cleanup complete.");
};

export default cleanup;

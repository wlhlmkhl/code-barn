import { OUT_FOLDER } from "../config/PATHS.mjs";
import { getPosts, getPostById, createFile } from "../utils/utils.mjs";
import ora from "ora";
import chalk from "chalk";

const folderPath = OUT_FOLDER;

// Fetches all posts from the database and saves them as files in the output folder.
export const fetchAll = () => {
  const spinner = ora("Fetching all posts...").start();
  const data = getPosts();
  if (!data || data.length === 0) {
    spinner.fail(chalk.yellow("CodeBarn is empty."));
    return;
  }
  data.forEach((file) =>
    createFile(folderPath, file.title, file.code, file.id)
  );
  spinner.succeed(chalk.green(`Fetched and saved ${data.length} posts.`));
};

// Fetches a single post by ID from the database and saves it as a file in the output folder.
export const fetchById = (id) => {
  const spinner = ora(`Fetching post with ID: ${id}...`).start();
  const file = getPostById(id);
  if (!file) {
    spinner.fail(chalk.yellow(`No post found with ID: ${id}.`));
    return;
  }
  createFile(folderPath, file.title, file.code, file.id);
  spinner.succeed(chalk.green(`Fetched and saved post "${file.title}".`));
};

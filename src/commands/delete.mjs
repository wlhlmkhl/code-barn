import ora from "ora";
import chalk from "chalk";

import { deleteAllPosts, deletePostById } from "../utils/utils.mjs";

// Deletes all snippets from the database.
export const deleteAll = async () => {
  const spinner = ora("Deleting all snippets...").start();
  try {
    await deleteAllPosts();
    spinner.succeed(chalk.green("The CodeBarn is empty"));
  } catch (error) {
    spinner.fail(chalk.red("Failed to delete all snippets"));
    console.error(chalk.red(error));
  }
};

// Deletes a snippet from the database by its unique ID.
export const deleteById = async (id) => {
  const spinner = ora(`Deleting snippet with ID: ${id}...`).start();
  try {
    await deletePostByid(id);
    spinner.succeed(chalk.green(`Snippet with ID: ${id} has been deleted`));
  } catch (error) {
    spinner.fail(chalk.red(`Failed to delete snippet with ID: ${id}`));
    console.error(chalk.red(error));
  }
};

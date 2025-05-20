import inquirer from "inquirer";
import path from "node:path";
import ora from "ora";
import chalk from "chalk";

import {
  getPosts,
  extractNumber,
  getPostById,
  createFile,
} from "../utils/utils.mjs";
import { deleteById } from "./delete.mjs";

const showList = async () => {
  let keepRunning = true;

  while (keepRunning) {
    // Get all snippets from the database
    const data = getPosts();

    if (!data || data.length === 0) {
      console.log("CodeBarn is empty.");
      return;
    }

    // Create indexed lists for display and ID lookup
    const indexedTitles = data.map(
      (item, index) => `${index + 1}. ${item.title}`
    );
    const indexedIds = data.map((item) => item.id);

    // Prompt user to select a snippet
    const { selectedTitle } = await inquirer.prompt([
      {
        type: "list",
        name: "selectedTitle",
        message: "Choose a file",
        choices: indexedTitles,
      },
    ]);

    const index = extractNumber(selectedTitle) - 1;
    const selectedId = indexedIds[index];

    // Prompt user for action on the selected snippet
    const { selectedOption } = await inquirer.prompt([
      {
        type: "list",
        name: "selectedOption",
        message: "Choose an option",
        choices: ["fetch", "delete", "back"],
      },
    ]);

    switch (selectedOption) {
      case "fetch": {
        const spinner = ora("Fetching snippet...").start();
        try {
          const snippet = getPostById(selectedId);
          const folderPath = path.join(process.cwd(), "codebarn", "Out");
          createFile(folderPath, snippet.title, snippet.code, snippet.id);
          spinner.succeed(chalk.green(`${snippet.title} is created`));
        } catch (err) {
          spinner.fail(chalk.red("Failed to fetch and create the snippet."));
        }
        break;
      }

      case "delete": {
        const spinner = ora("Deleting snippet...").start();
        try {
          await deleteById(selectedId);
          spinner.succeed(chalk.yellow("Snippet is deleted"));
        } catch (err) {
          spinner.fail(chalk.red("Failed to delete the snippet."));
        }
        break;
      }

      case "back":
        // Loop continues automatically
        break;

      default:
        console.log(chalk.red("Unknown option selected."));
        break;
    }
  }
};

export default showList;

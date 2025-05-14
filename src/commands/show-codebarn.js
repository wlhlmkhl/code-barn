import {
  getPosts,
  extractNumber,
  getPostById,
  createFile,
} from "../utils/utils.mjs";

import inquirer from "inquirer";
import { deleteById } from "./delete.mjs";
import path from "path";

export default async function showList() {
  let keepRunning = true;

  while (keepRunning) {
    const data = getPosts();

    if (!data || data.length === 0) {
      console.log("CodeBarn is empty.");
      return;
    }

    const indexedTitles = data.map(
      (item, index) => `${index + 1}. ${item.title}`
    );
    const indexedIds = data.map((item) => item.id);

    //List of Snippets

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

    //Followup with options

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
        const snippet = getPostById(selectedId);
        const folderPath = path.join(process.cwd(), "codebarn", "Out");
        createFile(folderPath, snippet.title, snippet.code);
        console.log(`${snippet.title} is created`);
        break;
      }

      case "delete": {
        deleteById(selectedId);
        console.log("Snippet is deleted");
        break;
      }

      case "back":
        // Loop fortsätter automatiskt
        break;

      default:
        console.log("Unknown option selected.");
        break;
    }
  }
}

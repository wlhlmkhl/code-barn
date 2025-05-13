import { getPosts, extractNumber } from "../utils/utils.mjs";

import inquirer from "inquirer";

export default async function showList() {
  const data = getPosts();
  if (!data || data.length === 0) {
    console.log("CodeBarn is empty.");
  } else {
    const indexedTitles = data.map(
      (item, index) => `${index + 1}. ${item.title}`
    );

    const indexedIds = data.map((item, index) => item.id);

    const questions = [
      {
        type: "list",
        name: "selectedTitle",
        message: "Choose a file",
        choices: indexedTitles,
      },
    ];

    const answers = await inquirer.prompt(questions);
    const index = extractNumber(answers.selectedTitle) - 1;

    const selectedId = indexedIds[index];

    console.log(indexedIds);

    console.log(`Du valde: ${answers.selectedTitle}`);
    console.log(`ID för det valda objektet: ${selectedId}`);
  }
}

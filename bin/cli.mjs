#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";

import createFolder from "../src/commands/create-folder.mjs";
import { copyFiles } from "../src/commands/copy-files-to-database.mjs";
import showList from "../src/commands/show-codebarn.mjs";
import { fetchAll, fetchById } from "../src/commands/fetch.mjs";
import { deleteAll, deleteById } from "../src/commands/delete.mjs";
import cleanup from "../src/commands/clean-up.mjs";

// Handle Ctrl+C (SIGINT) gracefully and unexpected errors globally
process.on("SIGINT", () => {
  console.log("\n" + chalk.yellow("👋 Exited with Ctrl+C"));
  process.exit(0);
});

// Handle unexpected errors globally
process.on("uncaughtException", (error) => {
  if (error.name === "ExitPromptError") {
    console.log(chalk.yellow("👋 Prompt was cancelled with Ctrl+C"));
    process.exit(0);
  } else {
    console.error(chalk.red("❌ An unexpected error occurred:"), error);
    process.exit(1);
  }
});

const program = new Command();

program.name("codebarn").description("CLI tool for saving code and components");

program
  .command("create")
  .description("Create the main folders (codebarn, in, out) in the root folder")
  .action(createFolder);

program
  .command("copy")
  .description(
    "Copy all files from the input folder to the database and delete them from the folder"
  )
  .action(copyFiles);

program
  .command("list")
  .description("Show a list of all snippets stored in the database")
  .action(showList);

program
  .command("delete")
  .description("Delete all snippets or a specific snippet by UUID")
  .argument("<target>", "all")
  .action((target) => {
    if (target === "all") {
      deleteAll();
    } else {
      deleteById(target);
    }
  });

program
  .command("fetch")
  .description(
    "Export all snippets or a specific snippet by UUID to files in the output folder"
  )
  .argument("<target>", "all")
  .action((target) => {
    if (target === "all") {
      fetchAll();
    } else {
      fetchById(target);
    }
  });

program
  .command("cleanup")
  .description("Remove all folders and data created by the CLI")
  .action(cleanup);

program.parse();

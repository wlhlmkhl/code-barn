#!/usr/bin/env node

import { Command } from "commander";
import createFolder from "../src/commands/create-folder.js";
import {
  copyFiles,
  copyFileByPath,
} from "../src/commands/copy-files-to-database.js";
import showList from "../src/commands/show-codebarn.js";
import { fetchAll, fetchById } from "../src/commands/fetch.js";
import { deleteAll, deleteById } from "../src/commands/delete.mjs";

// Global hantering av Ctrl+C och oväntade fel
process.on("SIGINT", () => {
  console.log("\n👋 Avslutade med Ctrl+C");
  process.exit(0);
});

process.on("uncaughtException", (error) => {
  if (error.name === "ExitPromptError") {
    console.log("👋 Prompten avbröts med Ctrl+C");
    process.exit(0);
  } else {
    console.error("❌ Ett oväntat fel inträffade:", error);
    process.exit(1);
  }
});

const program = new Command();

program
  .name("codebarn")
  .description("CLI-verktyg för att spara kod och komponenter")
  .version("1.0.0");

program
  .command("create")
  .description("create a folder in root folder")
  .action(createFolder);
program
  .command("copy [path]")
  .description(
    "copy every file in in folder to database or copy path and copy specify file."
  )
  .action((path) => {
    if (path) {
      copyFileByPath(path);
    } else {
      copyFiles();
    }
  });

program
  .command("list")
  .description("Show a list of the everything stored in the codebarn")
  .action(showList);

program
  .command("delete")
  .description("Delete every snippet or by UUID")
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
  .description("Export every Snippet or by UUID")
  .argument("<target>", "all")
  .action((target) => {
    if (target === "all") {
      fetchAll();
    } else {
      fetchById(target);
    }
  });

program.parse();

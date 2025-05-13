#!/usr/bin/env node
import { Command } from "commander";

import createFolder from "../src/commands/create-folder.js";
import copyFileToDataBase from "../src/commands/copy-files-to-database.js";
import showList from "../src/commands/show-codebarn-list.js";
import { clearAllPosts } from "../src/utils/utils.mjs";
import fetchAll from "../src/commands/fetch-all.js";

const program = new Command();

program
  .name("codebarn")
  .description("CLI-verktyg för att spara kod och komponenter")
  .version("1.0.0");

program
  .command("create folder")
  .description("create a folder in root folder")
  .action(createFolder);
program
  .command("copy")
  .description("copy every file in in folder to databas")
  .action(copyFileToDataBase);

program
  .command("show list")
  .description("Show a list of the everything stored in the codebarn")
  .action(showList);

program
  .command("clear all")
  .description("Delete/clear all snippets in the database")
  .action(clearAllPosts);

program
  .command("fetch all")
  .description("EXport every Items to Out folder")
  .action(fetchAll);

program.parse();

#!/usr/bin/env node

import { Command } from "commander";
import init from "./commands/init";
import add from "./commands/add";
import get from "./commands/get";

const program = new Command();

program
  .name("tricox")
  .description("Tricox CLI – Reusable frontend component manager")
  .version("0.1.0");

program
  .command("init")
  .description("Initialize Tricox")
  .action(init);

program
  .command("add <file>")
  .description("Upload a component")
  .action(add);

program
  .command("get <name>")
  .description("Download a component")
  .option("-d, --dir <path>", "Output directory")
  .action(get);


program.parse();

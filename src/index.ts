#!/usr/bin/env node

import { Command } from 'commander';
import { createForgeJson, generateFiles } from './modules/commands';
import { copySampleTemplates } from './modules/commands/templates';

const program = new Command();

program
  .name('prisma-schema-forge')
  .description('Forge multiple artifacts from your Prisma schema models')
  .version('0.1.0');

// command: init
program
  .command('init')
  .description('Initialize forge.json file')
  .action(() => {
    createForgeJson();
  });

// command: templates
program
  .command('templates')
  .description('Generate sample templates')
  .action(() => {
    copySampleTemplates();
  });

// command: generate
program
  .command('generate')
  .description('Generate files based on template and Prisma schema')
  .option('-c, --config <path>', 'Specify a custom config file (default: forge.json)')
  .action((options) => {
    const configFilePath = options.config || 'forge.json';
    // console.log(configFilePath);
    generateFiles(configFilePath);
  });

program.parse(process.argv);

#!/usr/bin/env node

import { Command } from 'commander';
import { createForgeJson, generateFiles } from './modules/commands';
import { copySamples } from './modules/commands/samples';

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

// command: samples
program
  .command('samples')
  .description('Generate sample templates')
  .action(() => {
    copySamples();
  });

// command: generate
program
  .command('generate')
  .description('Generate files based on template and Prisma schema')
  .action(() => {
    generateFiles();
  });

program.parse(process.argv);

#!/usr/bin/env node

import { Command } from 'commander';
import { createForgeJson } from './init';

const program = new Command();

program
  .name('prisma-schema-forge')
  .description('Forge multiple artifacts from your Prisma schema models')
  .version('0.1.0');

program
  .command('init')
  .description('Initialize forge.json file')
  .action(() => {
    createForgeJson();
  });

program.parse(process.argv);

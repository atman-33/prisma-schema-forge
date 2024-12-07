import { Command } from 'commander';
import { createForgeJson } from './init';

const program = new Command();

program
  .name('prisma-schema-forge')
  .description('CLI for managing Prisma schema')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize forge.json file')
  .action(() => {
    createForgeJson();
  });

program.parse(process.argv);

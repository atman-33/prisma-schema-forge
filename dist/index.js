#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var commands_1 = require("./modules/commands");
var program = new commander_1.Command();
program
    .name('prisma-schema-forge')
    .description('Forge multiple artifacts from your Prisma schema models')
    .version('0.1.0');
// command: init
program
    .command('init')
    .description('Initialize forge.json file')
    .action(function () {
    (0, commands_1.createForgeJson)();
});
// command: generate
program
    .command('generate')
    .description('Generate files based on template and Prisma schema')
    .action(function () {
    (0, commands_1.generateFiles)();
});
program.parse(process.argv);

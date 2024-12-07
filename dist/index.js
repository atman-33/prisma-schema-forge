#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var init_1 = require("./init");
var program = new commander_1.Command();
program
    .name('prisma-schema-forge')
    .description('Forge multiple artifacts from your Prisma schema models')
    .version('0.1.0');
program
    .command('init')
    .description('Initialize forge.json file')
    .action(function () {
    (0, init_1.createForgeJson)();
});
program.parse(process.argv);

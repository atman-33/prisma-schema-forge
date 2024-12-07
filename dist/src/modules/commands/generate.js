"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFiles = void 0;
var forge_config_1 = require("../../config/forge-config");
var generateFiles = function () {
    var config = (0, forge_config_1.getConfig)();
    console.log(config);
    console.log('Files are being generated...');
};
exports.generateFiles = generateFiles;

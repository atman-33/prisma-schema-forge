"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createForgeJson = createForgeJson;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
function createForgeJson() {
    var defaultConfig = {
        prismaSchema: "./schema.prisma",
        output: "./@generated",
    };
    var filePath = path_1.default.resolve(process.cwd(), 'forge.json');
    if (fs_1.default.existsSync(filePath)) {
        console.error('forge.json already exists.');
        process.exit(1);
    }
    fs_1.default.writeFileSync(filePath, JSON.stringify(defaultConfig, null, 2), 'utf-8');
    console.log('forge.json has been created successfully.');
}

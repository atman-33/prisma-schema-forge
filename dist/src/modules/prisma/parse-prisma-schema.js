"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePrismaSchema = void 0;
var inflection = __importStar(require("inflection"));
var generateModelJson = function (models) {
    return models.map(function (model) {
        return {
            model: model.model,
            plural: model.plural,
            kebab: model.kebab,
            camel: model.camel,
            pluralKebab: model.pluralKebab,
            pluralCamel: model.pluralCamel,
            columns: model.columns.map(function (column) { return ({
                name: column.name,
                type: column.type,
                key: column.key,
            }); }),
        };
    });
};
var parsePrismaSchema = function (schemaContent) {
    var models = [];
    var currentModel = null;
    // Split the schema content into lines
    var lines = schemaContent.split('\n').filter(function (line) { return !line.trim().startsWith('//'); });
    // Iterate over each line
    lines.forEach(function (line) {
        // Check if the line defines a new model
        var modelMatch = line.match(/^model\s+(\w+)\s+\{/);
        if (modelMatch) {
            // If a new model is found, push the current model to the models array
            if (currentModel) {
                models.push(currentModel);
            }
            var model = modelMatch[1];
            // Create a new model object
            currentModel = {
                model: model,
                plural: inflection.pluralize(model),
                kebab: inflection.dasherize(model).toLowerCase(),
                camel: inflection.camelize(model, true),
                pluralKebab: inflection.dasherize(inflection.pluralize(model)).toLowerCase(),
                pluralCamel: inflection.camelize(inflection.pluralize(model), true),
                columns: [],
            };
        }
        else {
            // Check if the line contains the @id or @relation annotation etc
            var idMatch = line.match(/@id/);
            var relationMatch = line.match(/@relation/);
            var uniqueMatch = line.match(/@@unique/);
            // If there is no current model or the line contains a relation annotation, skip to the next line
            if (!currentModel || relationMatch || uniqueMatch) {
                return;
            }
            // Split the line into column name and type
            var columnMatch = line.split(/\s+/).filter(Boolean);
            if (columnMatch && columnMatch.length >= 2) {
                var columnName = columnMatch[0];
                var type = columnMatch[1];
                // Set the key value based on whether the line contains the @id annotation
                var key = idMatch ? 1 : 0;
                // Add the column object to the current model's columns array
                currentModel.columns.push({
                    name: columnName,
                    type: type,
                    key: key.toString(),
                });
            }
        }
    });
    // Push the last current model to the models array
    if (currentModel) {
        models.push(currentModel);
    }
    return generateModelJson(models);
};
exports.parsePrismaSchema = parsePrismaSchema;

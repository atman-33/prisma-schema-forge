import * as inflection from 'inflection';
import { Column, Model } from '../../types/model';
import { mapPrismaToTypeScriptType } from '../../utils/map-prisma-to-ts';

const createModel = (model: string): Model => {
  return {
    model: inflection.camelize(model),
    plural: inflection.pluralize(inflection.camelize(model)),
    kebab: inflection.dasherize(inflection.underscore(model)).toLowerCase(),
    camel: inflection.camelize(model, true),
    kebabPlural: inflection
      .dasherize(inflection.pluralize(inflection.underscore(model)))
      .toLowerCase(),
    camelPlural: inflection.camelize(inflection.pluralize(model), true),
    columns: [],
  };
};

const createColumn = (name: string, type: string, key: boolean): Column => {
  return {
    name: inflection.camelize(name),
    nameCamel: inflection.camelize(name, true),
    nameKebab: inflection.dasherize(inflection.underscore(name)).toLowerCase(),
    type: mapPrismaToTypeScriptType(type),
    key,
  };
};

const parsePrismaSchema = (schemaContent: string): Model[] => {
  const models: Model[] = [];
  let currentModel: Model | null = null;

  // Split the schema content into lines
  const lines = schemaContent.split('\n').filter((line) => !line.trim().startsWith('//'));

  // Iterate over each line
  lines.forEach((line) => {
    // Check if the line defines a new model
    const modelMatch = line.match(/^model\s+(\w+)\s+\{/);
    if (modelMatch) {
      // If a new model is found, push the current model to the models array
      if (currentModel) {
        models.push(currentModel);
      }
      const model = modelMatch[1] as string;
      // Create a new model object
      currentModel = createModel(model);
    } else {
      // Check if the line contains the @id or @relation annotation etc
      const idMatch = line.match(/@id/);
      const relationMatch = line.match(/@relation/);
      const uniqueMatch = line.match(/@@unique/);

      // If there is no current model or the line contains a relation annotation, skip to the next line
      if (!currentModel || relationMatch || uniqueMatch) {
        return;
      }

      // Split the line into column name and type
      const columnMatch = line.split(/\s+/).filter(Boolean);
      if (columnMatch && columnMatch.length >= 2) {
        const columnName = columnMatch[0];
        const type = columnMatch[1];
        // Set the key value based on whether the line contains the @id annotation
        const key = idMatch ? true : false;
        // Add the column object to the current model's columns array
        currentModel.columns.push(createColumn(columnName, type, key));
      }
    }
  });

  // Push the last current model to the models array
  if (currentModel) {
    models.push(currentModel);
  }

  return models;
};

export { Model, parsePrismaSchema };

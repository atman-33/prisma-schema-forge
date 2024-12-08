import path from 'path';
import { ConfigManager } from '../../config/forge-config';
import { createFile, getAllFilePaths, readFile } from '../../utils/file';
import { parsePrismaSchema } from '../prisma/parse-prisma-schema';
import { getOutputByModel } from '../templates/output-by-model';

/**
 * Generate files from templates and schema.prisma file.
 */
export const generateFiles = (configFilePath?: string) => {
  ConfigManager.setConfig(configFilePath);
  const config = ConfigManager.getConfig();
  const shemeContent = readFile(config.prismaSchema);
  const models = parsePrismaSchema(shemeContent);

  const templatePaths = getAllFilePaths(config.templates);
  // console.log(templatePaths);

  models.map((model) => {
    templatePaths.map((templatePath) => {
      // $column exsits in path
      if (templatePath.includes('$column')) {
        model.columns.map((column) => {});
        // TODO: 要実装
      } else {
        // $column not exsits in path
        const output = getOutputByModel(templatePath, model);
        createFile(output.outputPath, output.outputContent);
      }
    });
  });

  console.log(`✅ File generated! => ${path.join(process.cwd(), config.output)}`);
};

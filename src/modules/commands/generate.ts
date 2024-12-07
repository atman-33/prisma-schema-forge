import path from 'path';
import { getConfig } from '../../config/forge-config';
import { createFile, getAllFilePaths, readFile } from '../../utils/file';
import { parsePrismaSchema } from '../prisma/parse-prisma-schema';
import { getOutputFile } from '../templates/output';

/**
 * Generate files from templates and schema.prisma file.
 */
export const generateFiles = () => {
  const config = getConfig();
  const shemeContent = readFile(config.prismaSchema);
  const models = parsePrismaSchema(shemeContent);

  const templatePaths = getAllFilePaths(config.templates);
  // console.log(templatePaths);

  models.map((model) => {
    templatePaths.map((templatePath) => {
      const output = getOutputFile(templatePath, model);
      createFile(output.outputPath, output.outputContent);
    });
  });

  console.log(`✅ File generated! => ${path.join(process.cwd(), config.output)}`);
};

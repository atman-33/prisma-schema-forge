import path from 'path';
import { ConfigManager } from '../../config/forge-config';
import { Output } from '../../types/output';
import { readFile } from '../../utils/file';
import { Model } from '../prisma/parse-prisma-schema';

const replaceToken = (content: string, model: Model) => {
  content = content.replace(/__model__/g, model.name.pascal);
  content = content.replace(/__modelPlural__/g, model.name.pascalPlural);
  content = content.replace(/__modelCamel__/g, model.name.camel);
  content = content.replace(/__modelCamelPlural__/g, model.name.camelPlural);
  content = content.replace(/__modelKebab__/g, model.name.kebab);
  content = content.replace(/__modelKebabPlural__/g, model.name.kebabPlural);
  content = content.replace(
    /__modelColumns__/g,
    model.columns.map((column) => column.name).join('\n'),
  );
  return content;
};

const getOutputByModel = (templatePath: string, model: Model): Output => {
  const config = ConfigManager.getConfig();

  const templateContent = readFile(templatePath);

  // NOTE: get relative path of template
  const templateRelativePath = path.relative(
    path.join(process.cwd(), config.templates),
    templatePath,
  );

  const outputPath = path.join(
    process.cwd(),
    config.output,
    model.name.kebab,
    replaceToken(templateRelativePath, model),
  );

  const outputContent = replaceToken(templateContent, model);

  return {
    templatePath,
    templateContent,
    outputPath,
    outputContent,
  };
};

export { getOutputByModel, replaceToken };

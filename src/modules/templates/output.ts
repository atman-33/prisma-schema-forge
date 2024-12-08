import path from 'path';
import { ConfigManager } from '../../config/forge-config';
import { readFile } from '../../utils/file';
import { Model } from '../prisma/parse-prisma-schema';

const replaceToken = (content: string, model: Model) => {
  content = content.replace(/__model__/g, model.model);
  content = content.replace(/__modelPlural__/g, model.plural);
  content = content.replace(/__modelCamel__/g, model.camel);
  content = content.replace(/__modelCamelPlural__/g, model.camelPlural);
  content = content.replace(/__modelKebab__/g, model.kebab);
  content = content.replace(/__modelKebabPlural__/g, model.kebabPlural);
  content = content.replace(
    /__modelColumns__/g,
    model.columns.map((column) => column.name).join('\n'),
  );
  return content;
};

interface OutputFile {
  templatePath: string;
  templateContent: string;
  outputPath: string;
  outputContent: string;
}

const getOutputFile = (templatePath: string, model: Model): OutputFile => {
  const config = ConfigManager.getConfig();

  // NOTE: get relative path of template
  const templateRelativePath = path.relative(
    path.join(process.cwd(), config.templates),
    templatePath,
  );

  const outputPath = path.join(
    process.cwd(),
    config.output,
    model.kebab,
    replaceToken(templateRelativePath, model),
  );

  const templateContent = readFile(templatePath);
  const outputContent = replaceToken(templateContent, model);

  return {
    templatePath,
    templateContent,
    outputPath,
    outputContent,
  };
};

export { getOutputFile, replaceToken };

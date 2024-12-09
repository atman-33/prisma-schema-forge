import path from 'path';
import { ConfigManager } from '../../config/forge-config';
import { Column } from '../../types/model';
import { Output } from '../../types/output';
import { readFile } from '../../utils/file';
import { removeSuffix } from '../../utils/text';
import { Model } from '../prisma/parse-prisma-schema';

const replaceToken = (content: string, model?: Model, column?: Column) => {
  if (model) {
    content = content.replace(/__model__/g, model.name.pascal);
    content = content.replace(/__modelPlural__/g, model.name.pascalPlural);
    content = content.replace(/__modelCamel__/g, model.name.camel);
    content = content.replace(/__modelCamelPlural__/g, model.name.camelPlural);
    content = content.replace(/__modelKebab__/g, model.name.kebab);
    content = content.replace(/__modelKebabPlural__/g, model.name.kebabPlural);
    content = content.replace(
      /__modelColumns__/g,
      model.columns.map((column) => column.name.camel).join('\n'),
    );
  }

  if (column) {
    content = content.replace(/__column__/g, column.name.pascal);
    content = content.replace(/__columnCamel__/g, column.name.camel);
    content = content.replace(/__columnKebab__/g, column.name.kebab);
    content = content.replace(/__columnType__/g, column.type);
  }

  return content;
};

const getOutputByModel = (templatePath: string, model: Model, cwd?: string): Output => {
  cwd ??= process.cwd();

  const config = ConfigManager.getConfig();
  const templateContent = readFile(templatePath);
  // NOTE: get relative path of template
  const templateRelativePath = path.relative(path.join(cwd, config.templates), templatePath);
  // console.log('cwd: ', cwd);
  // console.log('templatePath: ', templatePath);
  // console.log('config.templates: ', path.join(cwd, config.templates));
  // console.log('templateRelativePath: ', templateRelativePath);

  let outputPath = path.join(
    cwd,
    config.output,
    model.name.kebab,
    replaceToken(templateRelativePath, model),
  );
  console.log(outputPath);
  console.log(removeSuffix('abcde', 'de'));
  outputPath = removeSuffix(outputPath, '.txt');
  console.log(outputPath);

  const outputContent = replaceToken(templateContent, model);

  return {
    templatePath,
    templateContent,
    outputPath,
    outputContent,
  };
};

const getOutputByColumn = (
  templatePath: string,
  model: Model,
  column: Column,
  cwd?: string,
): Output => {
  cwd ??= process.cwd();

  const config = ConfigManager.getConfig();
  const templateContent = readFile(templatePath);
  let templateRelativePath = path.relative(path.join(cwd, config.templates), templatePath);
  templateRelativePath = templateRelativePath.replace(/\$column/g, column.name.kebab);
  // console.log('cwd: ', cwd);
  // console.log('templatePath: ', templatePath);
  // console.log('config.templates: ', path.join(cwd, config.templates));
  // console.log('templateRelativePath: ', templateRelativePath);

  let outputPath = path.join(
    cwd,
    config.output,
    model.name.kebab,
    replaceToken(templateRelativePath, model, column),
  );
  outputPath = removeSuffix(outputPath, '.txt');

  const outputContent = replaceToken(templateContent, model, column);

  return {
    templatePath,
    templateContent,
    outputPath,
    outputContent,
  };
};

export { getOutputByColumn, getOutputByModel, replaceToken };

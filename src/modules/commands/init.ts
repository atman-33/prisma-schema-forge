import fs from 'fs';
import path from 'path';

export const createForgeJson = () => {
  const defaultConfig = {
    prismaSchema: './schema.prisma',
    templates: './templates',
    output: './@generated',
  };

  const filePath = path.resolve(process.cwd(), 'forge.json');

  if (fs.existsSync(filePath)) {
    console.error('forge.json already exists.');
    process.exit(1);
  }

  fs.writeFileSync(filePath, JSON.stringify(defaultConfig, null, 2), 'utf-8');
  console.log('forge.json has been created successfully.');
};

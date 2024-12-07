import fs from 'fs';
import path from 'path';
import { defaultConfig } from '../../config/forge-config';

export const createForgeJson = () => {
  const filePath = path.resolve(process.cwd(), 'forge.json');

  if (fs.existsSync(filePath)) {
    console.error('forge.json already exists.');
    process.exit(1);
  }

  fs.writeFileSync(filePath, JSON.stringify(defaultConfig, null, 2), 'utf-8');
  console.log('forge.json has been created successfully.');
};

import * as fs from 'fs';
import * as path from 'path';

interface ForgeConfig {
  prismaSchema: string;
  templates: string;
  output: string;
}

export const getConfig = () => {
  const configPath = path.resolve(process.cwd(), 'forge.json');
  if (!fs.existsSync(configPath)) {
    throw new Error(`Config file not found: ${configPath}`);
  }

  const rawConfig = fs.readFileSync(configPath, 'utf-8');
  const configJson = JSON.parse(rawConfig);
  // console.log('forge.json:', configJson);

  return configJson as ForgeConfig;
};

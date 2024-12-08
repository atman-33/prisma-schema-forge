import * as fs from 'fs';
import * as path from 'path';

interface ForgeConfig {
  prismaSchema: string;
  templates: string;
  output: string;
}

export const defaultConfig: ForgeConfig = {
  prismaSchema: './prisma/schema.prisma',
  templates: './prisma-schema-forge/templates',
  output: './prisma-schema-forge/@generated',
};

export class ConfigManager {
  private static currentConfig: ForgeConfig = { ...defaultConfig };

  /**
   * Sets the configuration using the specified config file path.
   * If no path is provided, defaults to 'forge.json' in the current working directory.
   * Throws an error if the config file is not found.
   * Merges the provided config with the default config and updates the current configuration.
   *
   * @param configPath - Optional path to the config file.
   */
  static setConfig(configPath?: string): void {
    configPath ??= path.resolve(process.cwd(), 'forge.json');
    if (!fs.existsSync(configPath)) {
      throw new Error(`Config file not found: ${configPath}`);
    }

    const rawConfig = fs.readFileSync(configPath, 'utf-8');
    const configJson = JSON.parse(rawConfig);

    ConfigManager.currentConfig = {
      ...defaultConfig,
      ...configJson,
    };
  }

  /**
   * Retrieves the current configuration.
   *
   * @returns The current ForgeConfig object.
   */
  static getConfig(): ForgeConfig {
    return ConfigManager.currentConfig;
  }
}

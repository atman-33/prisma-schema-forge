import { getConfig } from '../../config/forge-config';

/**
 * Generate files from templates and schema.prisma file.
 */
export const generateFiles = () => {
  const config = getConfig();
  console.log(config);
  console.log('Files are being generated...');
};

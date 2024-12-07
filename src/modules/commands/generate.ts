import { getConfig } from '../../config/forge-config';

export const generateFiles = () => {
  const config = getConfig();
  console.log(config);
  console.log('Files are being generated...');
};

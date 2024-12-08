import path from 'path';
import { createFile } from '../../utils/file';
import { samples } from './samples';

export const generateSampleTemplates = () => {
  samples.map((sample) => {
    const filePath = path.resolve(process.cwd(), sample.filePath);
    createFile(filePath, sample.template);
    console.log(`file created: ${filePath}`);
  });
};

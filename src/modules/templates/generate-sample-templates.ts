import path from 'path';
import { createFileWithDirectories } from '../../utils/create-file';
import { samples } from './samples';

export const generateSampleTemplates = () => {
  samples.map((sample) => {
    const filePath = path.resolve(process.cwd(), sample.filePath);
    createFileWithDirectories(filePath, sample.template);
  });
};

import { generateSampleTemplates } from '../templates/generate-sample-templates';

export const copySampleTemplates = () => {
  generateSampleTemplates();
  console.log('sample template files have been created successfully.');
};

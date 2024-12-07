import { generateSampleTemplates } from '../templates/generate-sample-templates';

export const copySamples = () => {
  generateSampleTemplates();
  console.log('sample template files have been created successfully.');
};

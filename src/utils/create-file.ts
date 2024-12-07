import fs from 'fs';
import path from 'path';

/**
 * Utility function to create a file
 * @param filePath - Path to the file
 * @param content - Content of the file
 */
export const createFileWithDirectories = (filePath: string, content: string): void => {
  const dirPath = path.dirname(filePath); // Get the parent directory of the file

  // Create the directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true }); // Recursively create directories
  }

  // Write content to the file
  fs.writeFileSync(filePath, content, 'utf-8');
};

import fs from 'fs';
import path from 'path';

/**
 * Reads the content of a file synchronously.
 * @param filePath - The path to the file to be read.
 * @returns The content of the file as a string.
 */
const readFile = (filePath: string) => {
  return fs.readFileSync(filePath, 'utf-8');
};

/**
 * Creates a file at the given path with the given content.
 * If the parent directory does not exist, it is created recursively.
 * @param filePath - The path of the file to be created.
 * @param content - The content of the file to be written.
 */
const createFile = (filePath: string, content: string): void => {
  const dirPath = path.dirname(filePath); // Get the parent directory of the file

  // Create the directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true }); // Recursively create directories
  }

  // Write content to the file
  fs.writeFileSync(filePath, content, 'utf-8');
};

/**
 * Recursively retrieves the full paths of all files in a specified folder, including subfolders.
 * @param folderPath - The path to the folder.
 * @returns An array of full paths to each file.
 */
const getAllFilePaths = (folderPath: string): string[] => {
  const filePaths: string[] = [];

  const traverseDirectory = (currentPath: string) => {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.resolve(currentPath, entry.name);
      if (entry.isDirectory()) {
        traverseDirectory(fullPath); // Recursively process subfolders
      } else if (entry.isFile()) {
        filePaths.push(fullPath); // Add file path to the list
      }
    }
  };

  traverseDirectory(folderPath);
  return filePaths;
};

export { createFile, getAllFilePaths, readFile };

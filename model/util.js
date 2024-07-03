import fs from 'fs/promises';
import path from 'path';
import { writeFile } from 'fs/promises';

export const csvToListOfDicts = async (filePath) => {
    // Split the CSV string into lines
    const csvString = await readCSVFile(filePath);

    const lines = csvString.trim().split('\n');
    
    // Extract headers from the first line
    const headers = lines[0].split(',').map(header => header.trim());
    
    // Process remaining lines
    const result = lines.slice(1).map(line => {
      const values = line.split(',').map(value => value.trim());
      return headers.reduce((obj, header, index) => {
        obj[header] = values[index];
        return obj;
      }, {});
    });
  
    return result;
  }

const readCSVFile = async (filePath) => {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch (error) {
    throw new Error(`Error reading file: ${error.message}`);
  }
};

export const writeListOfDictsToJSON = async (list, filename) => {
  const jsonString = JSON.stringify(list);
  // Write the JSON string to a file
  fs.writeFile(filename, jsonString, (err) => {
    if (err) {
      console.error('Error writing to file', err);
    } else {
      console.log('Successfully wrote to file');
    }
  });
}

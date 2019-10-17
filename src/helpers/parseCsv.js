import csvParse from 'neat-csv';
import fs from 'fs';
import path from 'path';
const fsPromises = fs.promises;
let data = [];

/**
 * @description parseCsvFile is a function used to parseCsvFile which
 * contains all locations and addresses
 * @return {array} array of addresses
 */
export const parseCsvFile = async () => {
  if (!data.length) {
    const filePath = path.join(__dirname, '..', 'assets', 'store-locations.csv');
    const csv = await fsPromises.readFile(filePath);
    data = await csvParse(csv);
  }
  return data;
};


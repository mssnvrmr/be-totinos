import * as fs from 'fs';
import * as path from 'path';

export const createStateFilePath = (fileName: string) => path.join(__dirname, '..', 'data', fileName);

export const getValidRecordKeysById = (fileName: string) => {
  const records = JSON.parse(fs.readFileSync(createStateFilePath(fileName), 'utf8'));
  return records.map((record: any) => record.id);
};

export const getValidRecordKeysByEmail = (fileName: string) => {
  const records = JSON.parse(fs.readFileSync(createStateFilePath(fileName), 'utf8'));
  return records.map((record: any) => record.email);
};
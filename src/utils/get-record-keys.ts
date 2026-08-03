import * as fs from 'fs';
import * as path from 'path';

export const createStateFilePath = (fileName: string) => path.join(__dirname, '..', 'data', fileName);

const getRecords = (fileName: string) => {
  const data = JSON.parse(fs.readFileSync(createStateFilePath(fileName), 'utf8'));
  const key = fileName.replace(/\.json$/, '');
  return data[key] ?? [];
};

export const getValidRecordKeysById = (fileName: string) => {
  return getRecords(fileName).map((record: { id: string }) => record.id);
};

export const getValidRecordKeysByEmail = (fileName: string) => {
  return getRecords(fileName).map((record: { email: string }) => record.email);
};
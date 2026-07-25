import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const dataFilePath = join(__dirname, '..', 'data');

const getFilepath = (filename: string) => {
  return join(dataFilePath, filename);
};

export const readDB = (filename: string) => {
  const filepath = getFilepath(filename);
  const raw = readFileSync(filepath, "utf-8");
  return JSON.parse(raw);
};

export const writeDB = (filename: string, data: any) => {
  const filepath = getFilepath(filename);
  writeFileSync(filepath, JSON.stringify(data, null, 2));
};


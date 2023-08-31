/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getMigrator } from './migrator';
import * as fs from 'fs';
import * as path from 'path';
import { TaggedTemplateLiteralInvocation } from 'slonik';

// Utility function to run a migration
export const seed = async (query: TaggedTemplateLiteralInvocation<unknown>, file: string) => {
  console.log(`executing migration: ${file} ...`);
  const { pool, migrator } = await getMigrator();
  await migrator.up();
  await pool.query(query);
  console.log(`${file} migration executed`);
};

const directoryPath = path.join(__dirname, 'seeds');
async function runAll() {
  fs.readdir(directoryPath, async function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    for (const file of files) {
      const data = fs.readFileSync(path.resolve(directoryPath, file), {
        encoding: 'utf8',
        flag: 'r',
      });
      await seed({ sql: data, values: [], type: 'SLONIK_TOKEN_SQL' }, file);
    }
    console.log('done');
    process.exit(0);
  });
}

runAll();

import { SlonikMigrator } from '@slonik/migrator';
import { createPool } from 'slonik';
import * as dotenv from 'dotenv';
import * as path from 'path';

// use .env or .env.test depending on NODE_ENV variable
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

export async function getMigrator() {
  const pool = await createPool(
    `postgres://${process.env.DATABAS_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABAS_HOST}/${process.env.DATABAS_NAME}`,
  );

  const migrator = new SlonikMigrator({
    migrationsPath: path.resolve(__dirname, 'migrations'),
    migrationTableName: 'migration',
    slonik: pool,
  } as any);

  return { pool, migrator };
}

import dotenv, { DotenvParseOutput } from 'dotenv';
import * as fs from 'fs';

dotenv.config();

export class EnvParser {
  static parse(): DotenvParseOutput {
    return {
      ...process.env,
      ...dotenv.parse(fs.readFileSync('.env')),
    };
  }
}

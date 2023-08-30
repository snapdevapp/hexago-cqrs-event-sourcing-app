import dotenv, { DotenvParseOutput } from 'dotenv';
import * as fs from 'fs';

dotenv.config();

export const ENV = {
  PRODUCTION: 'production',
  STAGING: 'staging',
  DEVELOPMENT: 'development',
  TEST: 'test',
};

export class EnvParser {
  static parse(): DotenvParseOutput {
    let envFileName = '';
    let config = process.env;

    switch (process.env.NODE_ENV) {
      case ENV.PRODUCTION:
        envFileName = '.prod.env';
        break;
      case ENV.STAGING:
        envFileName = '.staging.env';
        break;
      case ENV.TEST:
        envFileName = '.test.env';
        break;
      case ENV.DEVELOPMENT:
        envFileName = '.env';
        break;
      default:
        envFileName = '.env';
        break;
    }
    if (envFileName !== '') {
      config = dotenv.parse(fs.readFileSync(envFileName));
    } else {
      config = process.env;
    }
    return config;
  }
}

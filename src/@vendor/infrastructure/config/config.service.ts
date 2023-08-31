import { RmqOptions, Transport } from '@nestjs/microservices';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Joi from 'joi';
import path from 'path';
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

/**
 * Env config interface.
 */
export interface EnvConfig {
  [key: string]: string | undefined;
}

export class ConfigService {
  /**
   * envConfig.
   */
  private readonly envConfig: EnvConfig;

  /**
   * Config service constructor.
   */
  constructor() {
    /**
     * Read env file only development mode.
     */
    const config = EnvParser.parse();
    this.envConfig = ConfigService.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private static validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      PORT: Joi.number().default(3000),
      APP_NAME: Joi.string().required(),
      APP_URL: Joi.string()
        .required()
        .uri({ scheme: ['http', 'https'] }),
      DATABASE_NAME: Joi.string().required(),
      DATABASE_PASSWORD: Joi.optional().default(''),
      DATABASE_USERNAME: Joi.string().required(),
      DATABASE_HOST: Joi.string().required(),
      DATABASE_PORT: Joi.number().required(),
    }).unknown(true);

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig);

    if (error) {
      throw new Error(`Config validation error with message below: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  /**
   * Type ORM configuration.
   */
  get typeOrmConfig(): TypeOrmModuleOptions {
    const entities = [path.resolve(`${__dirname}/../../../**/*.orm-entity.ts`)];
    return {
      type: 'postgres',
      replication: {
        master: {
          host: this.envConfig.DATABASE_HOST,
          username: this.databaseUserName,
          password: this.databasePassword,
          database: this.databaseName,
          port: this.databasePort,
        },
        slaves: [
          {
            host: this.readDatabaseHost,
            username: this.readDatabaseUserName,
            password: this.readDatabasePassword,
            database: this.databaseName,
            port: this.databasePort,
          },
        ],
      },
      migrationsTransactionMode: 'all',
      synchronize: true,
      migrationsRun: true,
      autoLoadEntities: true,
      logging: this.nodeEnv === 'development' ? 'all' : ['error', 'migration', 'schema'],
      entities,
      migrations: [`${__dirname}/../../../database/migrations/**`],
      migrationsTableName: 'migrations',
    };
  }

  get baseUrl(): string | undefined {
    return this.envConfig.BASE_URL;
  }

  get rabbitMQURL(): string {
    return this.envConfig.RABBIT_MQ_URL;
  }

  get nodeEnv(): string {
    return process.env.NODE_ENV;
  }

  get databaseName(): string {
    return this.envConfig.DATABASE_NAME;
  }

  get databaseHost(): string {
    return this.envConfig.DATABASE_HOST;
  }

  get databaseUserName(): string {
    return this.envConfig.DATABASE_USERNAME;
  }

  get databasePassword(): string {
    return this.envConfig.DATABASE_PASSWORD;
  }

  get readDatabaseHost(): string {
    return this.envConfig.DATABASE_HOST;
  }

  get readDatabaseUserName(): string {
    return this.envConfig.DATABASE_USERNAME;
  }

  get readDatabasePassword(): string {
    return this.envConfig.DATABASE_PASSWORD;
  }

  get databasePort(): number {
    return parseInt(this.envConfig.DATABASE_PORT);
  }

  get getMicroserviceClientOptions(): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.rabbitMQURL],
        queue: `${process.env.NODE_ENV.toLowerCase()}`,
        queueOptions: {
          durable: false,
        },
      },
    };
  }

  /**
   * Find env key.
   *
   * @param key
   */
  public get(key: string): string | undefined {
    return this.envConfig[key];
  }

  /**
   * Get number.
   *
   * @param key
   */
  public getNumber(key: string): number {
    return Number(this.envConfig[key]);
  }
}

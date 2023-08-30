import { ENV, EnvParser } from '@src/env-parser';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Joi from 'joi';

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
      NODE_ENV: Joi.string().valid([ENV.DEVELOPMENT, ENV.STAGING, ENV.PRODUCTION, ENV.TEST]).default(ENV.DEVELOPMENT),
      PORT: Joi.number().default(3000),
      APP_NAME: Joi.string().required(),
      APP_URL: Joi.string().required().uri(),
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
    const entities = [`${__dirname}/../../**/*.orm-entity.ts`];
    return {
      type: 'postgres',
      replication: {
        master: {
          host: this.getDatabaseHost,
          username: this.getDatabaseUserName,
          password: this.getDatabasePassword,
          database: this.getDatabaseName,
          port: this.getDatabasePort,
        },
        slaves: [
          {
            host: this.getReadDatabaseHost,
            username: this.getReadDatabaseUserName,
            password: this.getReadDatabasePassword,
            database: this.getDatabaseName,
            port: this.getDatabasePort,
          },
        ],
      },
      synchronize: false,
      migrationsRun: false,
      autoLoadEntities: true,
      logging: this.nodeEnv === ENV.DEVELOPMENT ? 'all' : ['error', 'migration', 'schema'],
      // logging: ['error', 'migration', 'schema'],
      entities,
      // migrations,
    };
  }

  /**
   * Base url.
   */
  get baseUrl(): string | undefined {
    return this.envConfig.BASE_URL;
  }

  /**
   * Get Rabbit MQ URL.
   */
  get rabbitMQURL(): string {
    return this.envConfig.RABBIT_MQ_URL;
  }

  get nodeEnv(): string {
    return process.env.NODE_ENV;
  }

  get getDatabaseName(): string {
    return '';
  }

  get getDatabaseHost(): string {
    return '';
  }

  get getDatabaseUserName(): string {
    return '';
  }

  get getDatabasePassword(): string {
    return '';
  }

  get getReadDatabaseHost(): string {
    return '';
  }

  get getReadDatabaseUserName(): string {
    return '';
  }

  get getReadDatabasePassword(): string {
    return '';
  }

  get getDatabasePort(): number {
    return 2000;
  }

  /**
   * Get banking rabbitmq service.
   * @return RmqOptions
   */
  getMicroserviceClientOptions(): RmqOptions {
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

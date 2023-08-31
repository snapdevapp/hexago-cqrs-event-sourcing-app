import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import OnboardingModule from './app/onboarding/onboarding.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@vendor/infrastructure/config/config.module';
import { ConfigService } from '@vendor/infrastructure/config';
// ./src/@vendor/infrastructure/database/migrations
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        console.log(configService.typeOrmConfig);
        return configService.typeOrmConfig;
      },
      inject: [ConfigService],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        serializers: {
          req: req => ({
            id: req.id,
            method: req.method,
            url: req.url,
          }),
        },
        transport:
          process.env.NODE_ENV === 'development'
            ? {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                },
              }
            : undefined,
        level: 'info', // process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      },
    }),
    OnboardingModule,
    LoggerModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import OnboardingModule from './modules/onboarding/onboarding.module';

@Module({
  imports: [
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
  ],
})
export class AppModule {}

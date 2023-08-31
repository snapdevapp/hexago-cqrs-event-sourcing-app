import { Module } from '@nestjs/common';
import RegisterController from './interface/controllers/register.controller';
import { executeSendWelcomeEmailProvider } from './onboarding.provider';
import { OnboardingSaga } from './onboarding.saga';
import { UnitOfWork } from './infrastructure/persistence/repositories/unit-of-work';
import { CqrsModule } from '@nestjs/cqrs';
import { LoggerModule } from '@vendor/infrastructure/adapters/logger/logger.module';

@Module({
  imports: [CqrsModule, LoggerModule],
  providers: [executeSendWelcomeEmailProvider, UnitOfWork, OnboardingSaga],
  controllers: [RegisterController],
})
export default class OnboardingModule {}

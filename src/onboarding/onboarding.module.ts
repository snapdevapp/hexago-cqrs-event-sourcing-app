import { Module } from '@nestjs/common';
import RegisterController from './interface/controllers/register.controller';
import { executeSendWelcomeEmailProvider } from './onboarding.provider';
import { OnboardingSaga } from './onboarding.saga';

@Module({
  providers: [executeSendWelcomeEmailProvider],
  controllers: [RegisterController, OnboardingSaga],
})
export default class OnboardingModule {}

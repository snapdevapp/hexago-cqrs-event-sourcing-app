import { ModelBase } from '@vendor/interface/base-classes/model.base.interface';

export interface IVaultChallengeResponse extends ModelBase {
  description: string;
  deadline: Date;
  targetAmount: number;
  iconUrl?: string;
  reward: string;
  label: string;
  isVCAllowed: boolean;
  isPCAllowed: boolean;
  participantNumber?: number;
  winnerNumber?: number;
  recurringAutoCreditFrequency?: string;
  recurringAutoCreditAmount: number;
  hasRecurringAutoCredit: boolean;
  minimumDeposit?: number;
  termsOfUseIntercomId?: number;
}

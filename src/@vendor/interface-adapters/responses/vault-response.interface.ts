import { ModelBase } from '@vendor/interface/base-classes/model.base.interface';

export interface IVaultResponse extends ModelBase {
  description: string;
  deadline: Date;
  targetAmount: number;
  hasRecurringAutoCredit?: boolean;
  recurringAutoCreditFrequency?: string;
  recurringAutoCreditAmount?: number;
  hasChangeAutoCredit: boolean;
  changeAutoCreditMultiplier: number;

  iconUrl?: string;
  vaultBalance: number;
  accountExternalId: string;
  vaultChallengeId?: string;
}

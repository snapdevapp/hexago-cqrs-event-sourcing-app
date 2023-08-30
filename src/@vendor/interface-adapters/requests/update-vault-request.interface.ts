export interface IUpdateVaultRequest {
  description?: string;

  deadline?: Date;

  targetAmount?: number;

  hasRecurringAutoCredit?: boolean;

  recurringAutoCreditFrequency?: string;

  recurringAutoCreditAmount?: number;

  hasChangeAutoCredit?: boolean;

  changeAutoCreditMultiplier?: number;

  iconUrl?: string;
}

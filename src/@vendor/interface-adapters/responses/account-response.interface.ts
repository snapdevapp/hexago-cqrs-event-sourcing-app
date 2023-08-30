import { ModelBase } from '@vendor/interface/base-classes/model.base.interface';

export interface IAccountResponse extends ModelBase {
  id: string;
  balance?: number;
  status?: string;
  type?: string;
  lastFourDigits?: string;
  expirationDate?: string;
  category?: string;
  balanceLastSyncedAt?: Date;
  isDefaultAccount: boolean;
  isVirtualCard: boolean;
}

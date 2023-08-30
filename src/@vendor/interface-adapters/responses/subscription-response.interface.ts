import { ModelBase } from '@vendor/interface/base-classes/model.base.interface';

export interface ISubscriptionConfiguration {
  cardCost?: number | string;
  recurringFee?: number | string;
  topUpFee?: number | string;
  freeCashinLimit?: number | string;
  processorCashinRate?: number | string;
  freeCashinPeriod?: number | string;
  referralReward?: number | string;
  callToActionButtonLabel?: string;
  monthlyFeeText?: string;
  callToActionButton?: string;
  initialTopUp?: number | string;
  balanceLimit?: number | string;
  monthlyCashinLimit?: number | string;
  dailyCashinLimit?: number | string;
  cardToCardTransferLimit?: number | string;
  dailyTransferCardToCardLimit?: number | string;
  withdrawalLimit?: number | string;
}

export interface ISubscriptionCounter {
  id: string;
  label?: string;
  billingLabel?: string;
  type?: 'SUM' | 'COUNT';
  rate?: number;
  value?: number;
  maximum?: number;
  fee?: number;
  transactionLabel?: string;
}

export interface ISubscriptionResponse extends ModelBase {
  activationDate: Date;
  expirationDate: Date;
  productIdentifier: string;
  productName: string;
  productId: string;
  nextSubscriptionProductId: string;
  configuration: ISubscriptionConfiguration;
  accountId: string;
  counters: ISubscriptionCounter[];
  nsfCount?: number;
  nsfSum?: number;
  paymentCount?: number;
  paymentSum?: number;
}

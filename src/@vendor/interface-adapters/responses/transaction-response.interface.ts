import { ModelBase } from '@vendor/interface/base-classes/model.base.interface';

export interface ITransactionResponse extends ModelBase {
  iconUrl: string;
  accountId: string;
  balanceAfter: number;
  type: string;
  amount: number;
  fees: number;
  chargedAmount: number;
  date: Date;
  status: string;
  label: string;
  description: string;
  parentTransactionId?: string;
  serviceIdentifier: string;
  recipientE164?: string;
  recipientLabel?: string;
  senderLabel?: string;
  isChangeAutoCreditTransaction?: boolean;
  isRecurringTransferTransaction?: boolean;
  senderE164?: string;
  senderFirstName?: string;
  merchantName?: string;
  bankName?: string;
  p2pNote?: string;
  p2pIllustrationUrl?: string;
  operatorName?: string;
  cardLoadingPhoneNumberE164: string;
  transferPhoneNumberE164: string;
  transferStatus?: string;
  depositStatus?: string;
}

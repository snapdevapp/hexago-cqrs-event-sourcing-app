import { TransactionStatusEnum, Metadata } from '@modules/banking/core/domain/entities/transaction.entity';

export interface UpdateMobileMoneyTransferTransactionRequest {
  provider: 'hub2' | 'intouch' | 'bizao';
  payload: MMPayload;
}

export interface MMPayload {
  reference: string;
  status: TransactionStatusEnum;
  failureReason?: Record<string, unknown>;
  providerPayload: Metadata;
}

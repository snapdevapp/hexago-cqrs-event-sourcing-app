export interface ICreateTransactionRequest {
  type: TransactionType;
  serviceIdentifier?: string;
  accountId: string;
  amount: number;
}

export type TransactionType = 'transfer' | 'cashin';

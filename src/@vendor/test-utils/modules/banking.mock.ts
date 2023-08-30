import faker from 'faker';
import { ClientEntity } from '@modules/banking/core/domain/entities/client.entity';
import { AccountEntity } from '@modules/banking/core/domain/entities/account.entity';
import { AccountCategoryEnum, AccountTypeEnum } from '@modules/banking/core/domain/entities/account.types';
import {
  P2P_TRANSFER_SERVICE_IDENTIFIER,
  ServiceEntity,
  ServiceWithdrawalFees,
} from '@modules/banking/core/domain/entities/service.entity';
import {
  ServiceConfiguration,
  ServiceConfigurationProps,
} from '@modules/banking/core/domain/value-objects/service-configuration.value-object';
import { VaultEntity } from '@modules/banking/core/domain/entities/vault.entity';
import { UUID } from '@vendor/domain/value-objects/uuid.value-object';
import { ReferralEntity } from '@modules/banking/core/domain/entities/referral.entity';
import { SubscriptionEntity } from '@modules/banking/core/domain/entities/subscription.entity';
import { SubscriptionStatusEnum } from '@modules/billing/core/domain/entities';
import { CardTypeEntity, CardTypeEntityIdentifier } from '@modules/banking/core/domain/entities/card-type.entity';
import { CardTypeOrmEntityProvider } from '@modules/banking/infrastructure/persistence/orm-entities/card-type.orm-entity';
import { CardTypePricingMetaData } from '@modules/banking/core/domain/value-objects/card-type.value-object';
import {
  Metadata,
  TransactionEntity,
  TransactionReferenceGenerator,
  TransactionStatusEnum,
  TransactionTypeEnum,
} from '@modules/banking/core/domain/entities/transaction.entity';
import {
  CreditGTPAccountResponse,
  DebitGTPAccountResponse,
  GTPError,
  ReverseGTPAccountResponse,
} from '@modules/banking/core/application/ports';

export const createAccountMock = (
  category: AccountCategoryEnum,
  type: AccountTypeEnum = AccountTypeEnum.GTP_BGFI_PC,
): AccountEntity =>
  AccountEntity.createAccount({
    category,
    type,
    externalId: '12345678',
    lastFourDigits: '0000',
    client: ClientEntity.createFromIdAndProps(faker.datatype.uuid(), {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      dateOfBirth: faker.datatype.datetime(),
      pushToken: 'some-fake-token',
      phoneNumberE164: '+225078117777',
      countryIsoCode: 'CI',
    }),
  });

export const createTransactionServiceMock = (arg?: {
  identifier?: string;
  withdrawalFees?: ServiceWithdrawalFees;
  serviceName?: string;
  providerName?: string;
}): ServiceEntity => {
  const configuration: ServiceConfigurationProps = {
    initialTransactionLabel: '',
    completedTransactionDescription: faker.datatype.string(),
    completedTransactionLabel: faker.datatype.string(),
    countryCode: faker.datatype.string(),
    currencyCode: faker.datatype.string(),
    failedTransactionDescription: faker.datatype.string(),
    failedTransactionLabel: faker.datatype.string(),
    initialTransactionDescription: faker.datatype.string(),
    maximumAllowedAmount: faker.datatype.number(),
    reverseTransactionDescription: faker.datatype.string(),
    operatorName: faker.datatype.string(),
    providerName: arg?.providerName ?? faker.datatype.string(),
    serviceName: arg?.serviceName ?? faker.datatype.string(),
    reverseTransactionLabel: faker.datatype.string(),
    minimumAllowedAmount: 200,
    providerFeeRate: 0,
    failedNotificationBody: '',
    failedNotificationTitle: '',
  };

  const params = {
    identifier: arg?.identifier || P2P_TRANSFER_SERVICE_IDENTIFIER,
    order: faker.datatype.number(),
    category: faker.datatype.string(),
    iconUrl: faker.datatype.string(),
    isActive: faker.datatype.boolean(),
    label: faker.datatype.string(),
    name: faker.datatype.string(),
    configuration: new ServiceConfiguration(configuration),
    withdrawalFees: arg?.withdrawalFees,
  };

  return ServiceEntity.createFromIdAndProps(faker.datatype.uuid(), params);
};

export const createVaultMock = (arg: {
  amount: number;
  hasChangeAutoCredit: boolean;
  hasRecurringAutoCredit: boolean;
  vaultAccount?: AccountEntity;
}): VaultEntity =>
  VaultEntity.createVault({
    vaultId: new UUID(faker.datatype.uuid()),
    description: faker.datatype.string(),
    deadline: faker.datatype.datetime(),
    targetAmount: arg.amount,
    iconUrl: faker.datatype.string(),
    hasChangeAutoCredit: arg.hasChangeAutoCredit || false,
    changeAutoCreditMultiplier: arg.hasChangeAutoCredit ? 2 : 0,
    hasRecurringAutoCredit: arg.hasRecurringAutoCredit,
    recurringAutoCreditAmount: arg.hasRecurringAutoCredit ? 100 : 0,
    recurringAutoCreditFrequency: arg.hasRecurringAutoCredit ? 'month' : '',
    vaultAccount: arg.vaultAccount ?? createAccountMock(AccountCategoryEnum.vault),
  });

export const createReferralMock = (arg: {
  amount: number;
  invitingClientId: string;
  invitedClientId: string;
}): ReferralEntity =>
  new ReferralEntity({
    id: new UUID(faker.datatype.uuid()),
    isActive: true,
    props: {
      referralReward: arg.amount,
      invitingClientId: new UUID(arg.invitingClientId),
      invitedClientId: new UUID(arg.invitedClientId),
      completedAt: new Date(),
      completed: false,
    },
  });

export const createSubscriptionMock = (arg: {
  accountId: string;
  status?: SubscriptionStatusEnum.activated;
}): SubscriptionEntity =>
  new SubscriptionEntity({
    id: new UUID(faker.datatype.uuid()),
    isActive: true,
    props: {
      activationDate: faker.datatype.datetime(),
      expirationDate: faker.datatype.datetime(),
      terminatedDate: faker.datatype.datetime(),
      accountId: arg.accountId,
      status: arg.status,
    },
  });

export const createCardTypeMock = (identifier: CardTypeEntityIdentifier): CardTypeEntity =>
  new CardTypeEntity({
    id: new UUID(faker.datatype.uuid()),
    isActive: true,
    props: {
      isActive: true,
      name: 'free',
      provider: CardTypeOrmEntityProvider.GTP,
      pricing: new CardTypePricingMetaData({
        fundTransferToExternalAccount: 5000,
        cardLoad: [CardTypeEntityIdentifier.GTP_ECOBANK_PC].includes(identifier) ? 2 : 0,
      }),
      identifier: CardTypeEntityIdentifier.GTP_BGFI_PC,
      createdAt: faker.datatype.datetime(),
      updatedAt: faker.datatype.datetime(),
    },
  });

export const createTransactionMock = (arg: {
  type: TransactionTypeEnum;
  amount: number;
  accountId: string;
  label?: string;
  description?: string;
  fees?: number;
  status?: TransactionStatusEnum;
  metadata?: Metadata;
}): TransactionEntity =>
  new TransactionEntity({
    id: new UUID(faker.datatype.uuid()),
    isActive: true,
    props: {
      reference: TransactionReferenceGenerator.new(),
      type: arg.type,
      amount: arg.amount,
      chargedAmount: arg.amount,
      issuedDate: new Date(),
      accountId: new UUID(arg.accountId),
      iconUrl: 'https://via.placeholder.com/400',
      label: arg.label ?? faker.datatype.string(),
      description: arg.description ?? 'https://via.placeholder.com/400',
      fees: arg.fees ?? 0,
      status: arg.status ?? TransactionStatusEnum.PENDING,
      metadata: arg.metadata ?? {},
    },
  });

export const gtpDebitResponseMock = (): DebitGTPAccountResponse => ({
  gtpTransactionId: 'GTP-123456',
  debitedAt: new Date(),
});

export const gtpCreditResponseMock = (): CreditGTPAccountResponse => ({
  gtpTransactionId: 'GTP-123456',
  creditedAt: new Date(),
});

export const gtpReverseResponseMock = (): ReverseGTPAccountResponse => ({
  gtpTransactionId: 'GTP-123456',
  reversedAt: new Date(),
});

export const gtpErrorResponseMock = (): GTPError => ({
  message: 'some-gtp-error',
  code: -1,
});

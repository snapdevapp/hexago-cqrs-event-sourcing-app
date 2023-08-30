import { ServiceEntity, ServiceWithdrawalFees } from '@modules/billing/core/domain/entities/service.entity';
import {
  ServiceConfiguration,
  ServiceConfigurationProps,
} from '@modules/billing/core/domain/value-objects/service-configuration.value-object';
import faker from 'faker';

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
    identifier: arg?.identifier || 'P2P_TRANSFER_SERVICE_IDENTIFIER',
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

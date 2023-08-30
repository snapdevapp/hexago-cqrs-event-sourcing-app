export class Billing {
  /** @static getClientCurrentSubscription - retrieve client current subscription pattern */
  static getClientCurrentSubscription = 'billing.getClientCurrentSubscription';

  static getClientCurrentMobileMoneyTransferRate = 'billing.getClientCurrentMobileMoneyTransferRate';

  static getClientCurrentSubscriptionPaymentCount = 'billing.getClientCurrentSubscriptionPaymentCount';

  static getClientCurrentSubscriptionPaymentSum = 'billing.getClientCurrentSubscriptionPaymentSum';

  static getClientCurrentSubscriptionReferralBonusAmount = 'billing.getClientCurrentSubscriptionReferralBonusAmount';

  static checkIfClientSubscriptionDebtShouldBeRecovered = 'billing.checkIfClientSubscriptionDebtShouldBeRecovered';

  static getMobileMoneyDepositFee = 'billing.getMobileMoneyDepositFee';
}

/**
 * GTP connector patterns
 * @class Banking
 */
export class Banking {
  static addToDebt = 'banking.addToDebt';

  static removeFromDebt = 'banking.removeFromDebt';

  static debitAccountForInternalUsage = 'banking.debitAccountForInternalUsage';

  // will call the one step implementation
  static executeDebitAccountForInternalUsage = 'banking.executeDebitAccountForInternalUsage';

  static sumOfAllAccountsBalances = 'banking.sumOfAllAccountsBalances';

  static createTransactionForBDATransfer = 'banking.createTransactionForBDATransfer';
}

export class BankingTopic {
  // The prefix is only used internally, to handle consumer groups. In kafka there is no prefix. See ServerKafkaExtended.
  static prefix = 'kafka.banking';

  static transactions = `${this.prefix}.transactions`;

  static nsfCount = `${this.prefix}.nsf_count`;
}

export class Onboarding {
  static countClientOrders = 'onboarding.countClientOrders';

  static checkClientKYCStatus = 'onboarding.checkClientKYCStatus';

  static getClientKYC = 'onboarding.getClientKYC';

  static updateClientKYCWithActivityAndMonthlyIncome = 'onboarding.updateClientKYCWithActivityAndMonthlyIncome';
}

/**
 * GTP connector patterns
 * @class GtpConnector
 */
export class GTPConnector {
  /** @static cardPosNotification - POS notification event */
  static cardPOSNotification = 'GTP.POS';

  /** @static getCardNsfNotification - listen NSF notification */
  static cardNSFNotification = 'GTP.CARD_NSF_NOTIFICATION';

  /** @static getCardNsfNotification - listen ATM notification */
  static cardATMNotification = 'GTP.CARD_ATM_NOTIFICATION';

  /** @static getCardNsfNotification - listen ATM notification */
  static cardLoadedNotification = 'GTP.CARD_LOADED';

  /** @static cardVisaDirectNotification - listen VISA DIRECT notification */
  static cardVisaDirectNotification = 'GTP.VISA_DIRECT';
}

/**
 * Auth patterns
 * @class Auth
 */
export class Auth {
  /** @static jwtGeneratedNotification - JWT notification event */
  static jwtGeneratedNotification = 'AUTH.JWT_GENERATED';
}

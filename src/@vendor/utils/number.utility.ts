import { BigNumber } from 'bignumber.js';
import { customAlphabet } from 'nanoid';

/**
 * Calculate mobile money cashin fee
 */
export const getAmountFee = (amount: number, rate: number): number => {
  return new BigNumber(amount).multipliedBy(rate).dividedBy(100).decimalPlaces(0).toNumber();
};

/**
 * Generate random number
 */
export const generateRandomNumber = (length: number): number => {
  return Number(customAlphabet('1234567890', length)());
};

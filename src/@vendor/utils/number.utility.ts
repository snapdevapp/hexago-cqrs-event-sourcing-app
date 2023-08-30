import { BigNumber } from 'bignumber.js';
import { customAlphabet } from 'nanoid';

/**
 * Calculate mobile money operator fee
 */
export const MMOperatorFee = (amount: number, operatorRate: number, stampFee: number): number => {
  return new BigNumber(amount).multipliedBy(operatorRate).dividedBy(100).plus(stampFee).decimalPlaces(0).toNumber();
};

/**
 * Calculate mobile money cashin fee
 */
export const getAmountFee = (amount: number, cardLoadRate: number): number => {
  return new BigNumber(amount).multipliedBy(cardLoadRate).dividedBy(100).decimalPlaces(0).toNumber();
};

/**
 * Calculate mobile money billing fee
 */
export const MMBillingFee = (amount: number, billingRate: number): number => {
  return new BigNumber(amount).multipliedBy(billingRate).dividedBy(100).decimalPlaces(0).toNumber();
};

/**
 * Transform to number
 * @param value
 */
export const transformToNumber = (value: number): number => {
  return new BigNumber(value, 10).decimalPlaces(0).toNumber();
};

/**
 * Make minus operation
 */
export const makeMinus = (value: number, valueToRemove: number): number => {
  return new BigNumber(value).minus(valueToRemove).toNumber();
};

/**
 * Make addition
 */
export const makeAddition = (value: number, valueToRemove: number): number => {
  return new BigNumber(value).plus(valueToRemove).toNumber();
};

/**
 * Generate random number
 */
export const generateRandomNumber = (length: number): number => {
  return Number(customAlphabet('1234567890', length)());
};

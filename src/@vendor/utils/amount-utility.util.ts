// TODO: Warning / Find a better way to deal with float amount
/**
 * Float value cannot be converted in binary. This could leds to incorrect values when dealing with this type
 * To better understand the issue, you could test this operation (0.1+0.2) in an interpreter. You will get the result below
 * 0.1+0.2 = 0.30000000000000004
 */
export const roundFloatAmount = (amount: number): number => {
  return Math.round(amount);
};

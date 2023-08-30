type Metadata = { [key: string]: string };

/**
 * This method help us to transform any string to camel case format
 *
 * @param str string
 * @param withSpace boolean
 * @returns {string}
 */
export const capitalize = (str: string): string => {
  if (str === undefined) {
    return '';
  }

  return str.toLowerCase().replace(/(^|\s|-)\S/g, c => c.toUpperCase());
};

/**
 * Replace the recipient and fourDigit on parsed string
 *
 * @param str string
 * @param args {object}
 * @returns string
 */
export const replaceFourDigitsAndNumber = (
  str: string,
  args: { fourDigits: string; recipient?: string; operator?: string },
): string => {
  const options: Metadata = {
    ':recipient': args.recipient,
    ':fourDigits': args.fourDigits,
    ':operator': args.operator,
  };
  return str.replace(/:recipient|:fourDigits/gi, (matched): string => options[matched]);
};

/**
 * Format amount by using dot as thousand separator
 *
 * @param amount
 * @returns
 */
export const formatAmount = (amount: unknown): string => `${amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

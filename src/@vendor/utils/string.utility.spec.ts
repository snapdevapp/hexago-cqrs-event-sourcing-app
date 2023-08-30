import { capitalize, formatAmount, replaceFourDigitsAndNumber } from './string.utility';

describe('String utility testing', () => {
  it('should be return the right camel case format', () => {
    const result = capitalize('djamo api-v2');
    expect(result).toBe('Djamo Api-V2');
  });

  it("should be format 'N'dri Aubin Carlos'", () => {
    const result = capitalize("N'dri aubin carlos");
    expect(result).toBe("N'dri Aubin Carlos");
  });

  it("should be format 'jean-crepin'", () => {
    const result = capitalize('jean-crepin');
    expect(result).toBe('Jean-Crepin');
  });

  it("should be format 'ÉDITH MARIE JOSÉE'", () => {
    const result = capitalize('ÉDITH MARIE JOSÉE');
    expect(result).toBe('Édith Marie Josée');
  });

  it('should be return the empty string when parameter is undefined', () => {
    const result = capitalize(undefined);
    expect(result).toBe('');
  });
});

describe('replaceFourDigitsAndNumber', () => {
  it('should parse the string', () => {
    const result = replaceFourDigitsAndNumber(
      'Le rechargement de votre carte Djamo (xxxx-:fourDigits) via Wave par le :recipient a été effectué.',
      {
        fourDigits: '0001',
        recipient: '0749929598',
      },
    );
    expect(result).toBe('Le rechargement de votre carte Djamo (xxxx-0001) via Wave par le 0749929598 a été effectué.');
  });
});

describe('formatAmount', () => {
  it('Should return a number formatted as string with dot as thousands separator', () => {
    const result = formatAmount(23456789);
    expect(result).toBe('23.456.789');
  });
});

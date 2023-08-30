import { isTargetVersion } from './is-traget-version.utility';

describe('isTargetVersion', () => {
  it('should be false beceause all parameters is undefined', () => {
    const result = isTargetVersion(undefined, undefined, undefined);
    expect(result).toBeFalsy();
  });

  it('should be passe', () => {
    const result = isTargetVersion('1', '1', '1');
    expect(result).toBeTruthy();
  });

  it('should be the android version', () => {
    const result = isTargetVersion('7.0.10', '669', '6.0.09');
    expect(result).toBeTruthy();
  });

  it('should be the android version but not admissible version', () => {
    const result = isTargetVersion('5.0.10', '669', '6.0.09');
    expect(result).toBeFalsy();
  });

  it('should be a ios version', () => {
    const result = isTargetVersion('100', '100', '1.0.0');
    expect(result).toBeTruthy();
  });

  it('should be a ios version but not admissible version', () => {
    const result = isTargetVersion('100', '200', '1.0.0');
    expect(result).toBeFalsy();
  });

  it('should not be a valid app version', () => {
    const result = isTargetVersion('franck', '0000', '0000');
    expect(result).toBeFalsy();
  });
});

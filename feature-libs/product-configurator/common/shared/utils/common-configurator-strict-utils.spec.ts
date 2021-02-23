import { ensureStringDefined } from './common-configurator-strict-utils';
describe('CommonConfiguratorStrictUtils', () => {
  const PRODUCT_CODE = 'CONF_LAPTOP';

  it('should check defined string successfully', () => {
    expect(ensureStringDefined(PRODUCT_CODE)).toBe(PRODUCT_CODE);
  });

  it('should throw error when passing undefined for the string input', () => {
    expect(() => ensureStringDefined(undefined)).toThrowError();
  });
});

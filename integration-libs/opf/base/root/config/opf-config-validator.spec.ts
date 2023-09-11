import { OpfConfig } from './opf-config';
import { opfConfigValidator } from './opf-config-validator';

describe('opfConfigValidator', () => {
  it('should warn about an undefined opf configuration section', () => {
    const CONFIG: OpfConfig = {};
    expect(opfConfigValidator(CONFIG)).toBeTruthy();
  });

  it('should warn about undefined baseUrl configuration url', () => {
    const CONFIG: OpfConfig = {
      opf: {
        baseUrl: undefined,
        commerceCloudPublicKey: 'test',
      },
    };
    expect(opfConfigValidator(CONFIG)).toBeTruthy();
  });

  it('should warn about undefined commerceCloudPublicKey configuration property', () => {
    const CONFIG: OpfConfig = {
      opf: {
        baseUrl: 'test url',
        commerceCloudPublicKey: undefined,
      },
    };
    expect(opfConfigValidator(CONFIG)).toBeTruthy();
  });
});

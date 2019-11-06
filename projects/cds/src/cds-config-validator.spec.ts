import { CdsConfig } from './cds-config';
import { cdsConfigValidator } from './cds-config-validator';

describe('cdsConfigValidator', () => {
  it('should warn about undefined tenant', () => {
    const config: CdsConfig = {
      cds: {
        tenant: undefined,
        baseUrl: undefined,
        endpoints: undefined,
      },
    };
    expect(cdsConfigValidator(config)).toBeTruthy();
  });

  it('should warn about undefined baseUrl', () => {
    const config: CdsConfig = {
      cds: {
        tenant: 'argotest',
        baseUrl: undefined,
        endpoints: undefined,
      },
    };
    expect(cdsConfigValidator(config)).toBeTruthy();
  });

  it('should warn about undefined endpoints', () => {
    const config: CdsConfig = {
      cds: {
        tenant: 'argotest',
        baseUrl: 'https://localhost:4200',
        endpoints: undefined,
      },
    };
    expect(cdsConfigValidator(config)).toBeTruthy();
  });

  it('should warn about undefined strategyProducts endpoint', () => {
    const config: CdsConfig = {
      cds: {
        tenant: '',
        baseUrl: '',
        endpoints: {
          strategyProducts: undefined,
        },
      },
    };
    expect(cdsConfigValidator(config)).toBeTruthy();
  });
  it('should not warn about undefined configuration', () => {
    const config: CdsConfig = {
      cds: {
        tenant: '',
        baseUrl: '',
        endpoints: {
          strategyProducts: '',
        },
      },
    };
    expect(cdsConfigValidator(config)).toBeFalsy();
  });
});

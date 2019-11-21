import { CdsConfig } from './cds-config';
import { cdsConfigValidator } from './cds-config-validator';

describe('cdsConfigValidator', () => {
  it('should warn about an undefined cds configuration section', () => {
    const CONFIG: CdsConfig = {};
    expect(cdsConfigValidator(CONFIG)).toBeTruthy();
  });

  it('should warn about undefined profile tag configuration url', () => {
    const CONFIG: CdsConfig = {
      cds: {
        profileTag: {
          configUrl: undefined,
        },
      },
    };
    expect(cdsConfigValidator(CONFIG)).toBeTruthy();
  });

  it('should warn about undefined profile tag javascript url', () => {
    const CONFIG: CdsConfig = {
      cds: {
        profileTag: {
          configUrl: 'some config url',
          javascriptUrl: undefined,
        },
      },
    };
    expect(cdsConfigValidator(CONFIG)).toBeTruthy();
  });

  it('should warn about a blank profile tag javascript url', () => {
    const CONFIG: CdsConfig = {
      cds: {
        profileTag: {
          configUrl: 'some config url',
          javascriptUrl: '',
        },
      },
    };
    expect(cdsConfigValidator(CONFIG)).toBeTruthy();
  });

  it('should warn about undefined tenant', () => {
    const CONFIG: CdsConfig = {
      cds: {
        tenant: undefined,
        baseUrl: undefined,
        endpoints: undefined,
      },
    };
    expect(cdsConfigValidator(CONFIG)).toBeTruthy();
  });

  it('should warn about undefined baseUrl', () => {
    const CONFIG: CdsConfig = {
      cds: {
        tenant: 'argotest',
        baseUrl: undefined,
        endpoints: undefined,
      },
    };
    expect(cdsConfigValidator(CONFIG)).toBeTruthy();
  });

  it('should warn about undefined endpoints', () => {
    const CONFIG: CdsConfig = {
      cds: {
        tenant: 'argotest',
        baseUrl: 'https://localhost:4200',
        endpoints: undefined,
      },
    };
    expect(cdsConfigValidator(CONFIG)).toBeTruthy();
  });

  it('should warn about undefined strategyProducts endpoint', () => {
    const CONFIG: CdsConfig = {
      cds: {
        tenant: '',
        baseUrl: '',
        endpoints: {
          strategyProducts: undefined,
        },
      },
    };
    expect(cdsConfigValidator(CONFIG)).toBeTruthy();
  });

  it('should not warn about undefined configuration', () => {
    const CONFIG: CdsConfig = {
      cds: {
        tenant: 'argotest',
        baseUrl: '',
        endpoints: {
          strategyProducts: '',
        },
      },
    };
    expect(cdsConfigValidator(CONFIG)).toBeFalsy();
  });
});

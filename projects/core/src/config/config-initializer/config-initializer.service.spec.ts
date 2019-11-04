import { TestBed } from '@angular/core/testing';

import { ConfigInitializerService } from './config-initializer.service';
import { Config, CONFIG_INITIALIZER, ConfigInitializer } from '@spartacus/core';

const MockConfig = {
  test: 'test',
  scope1: 'notFinal',
};

function initScope1(): ConfigInitializer {
  return {
    scopes: ['scope1'],
    configFactory: async () => ({ scope1: 'final' }),
  };
}

function initScope2(): ConfigInitializer {
  return {
    scopes: ['scope2.nested'],
    configFactory: async () => ({ scope2: { nested: true } }),
  };
}

const configInitializers = [
  {
    provide: CONFIG_INITIALIZER,
    useFactory: initScope1,
    multi: true,
  },
  {
    provide: CONFIG_INITIALIZER,
    useFactory: initScope2,
    multi: true,
  },
];

describe('ConfigInitializerService', () => {
  let service: ConfigInitializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Config, useValue: MockConfig }],
    });
  });

  it('should be created', () => {
    service = TestBed.get(ConfigInitializerService);
    expect(service).toBeTruthy();
  });

  describe('when no config initializers are present', () => {
    beforeEach(() => {
      service = TestBed.get(ConfigInitializerService);
    });

    it('should get final config', async () => {
      expect(await service.getStableConfig()).toEqual(MockConfig);
    });

    it('should get final config for any scope', async () => {
      expect(await service.getStableConfig('scope1', 'scope2.nested')).toEqual(
        MockConfig
      );
    });
  });

  describe('with config initializers', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [...configInitializers],
      });
      service = TestBed.get(ConfigInitializerService);
    });

    it('initializers should contribute to final config', async () => {
      const config = await service.getStableConfig();
      expect(config.scope1).toEqual('final');
      expect(config.scope2.nested).toBeTruthy();
    });

    describe('getConfigStable should return correct config for scope', () => {
      it('scope1', async () => {
        const config = await service.getStableConfig('scope1');
        expect(config.scope1).toEqual('final');
      });

      it('scope2', async () => {
        const config = await service.getStableConfig('scope2');
        expect(config.scope2).toEqual({ nested: true });
      });

      it('scope2.nested', async () => {
        const config = await service.getStableConfig('scope2.nested');
        expect(config.scope2).toEqual({ nested: true });
      });

      it('scope2.nested.even.more', async () => {
        const config = await service.getStableConfig('scope2.nested.even.more');
        expect(config.scope2).toEqual({ nested: true });
      });

      it('scope1, scope2', async () => {
        const config = await service.getStableConfig('scope1', 'scope2');
        expect(config.scope1).toEqual('final');
        expect(config.scope2).toEqual({ nested: true });
      });
    });

    it('getConfigStable should fulfil gradually', async () => {
      const results = [];

      const stable = async () => {
        await service.getStableConfig('scope1');
        results.push('scope1');
      };
      const scope1 = async () => {
        await service.getStableConfig('scope2');
        results.push('scope2');
      };
      const scope2 = async () => {
        await service.getStableConfig();
        results.push('stable');
      };

      await Promise.all([stable(), scope1(), scope2()]);

      expect(results).toEqual(['scope1', 'scope2', 'stable']);
    });
  });
});

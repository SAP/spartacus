import { TestBed } from '@angular/core/testing';
import {
  Config,
  DefaultConfig,
  provideConfig,
  provideDefaultConfig,
  RootConfig,
} from '@spartacus/core';

describe('Config Injector Tokens', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideConfig({ a: 'root a' } as Config),
        provideDefaultConfig({ a: 'default a' } as Config),
        provideConfig({ b: 'root b' } as Config),
        provideDefaultConfig({ c: 'default c' } as Config),
      ],
    });
  });

  describe('Config', () => {
    it('should provide configuration', () => {
      const config: any = TestBed.inject(Config);
      expect(config).toEqual({ a: 'root a', b: 'root b', c: 'default c' });
    });
  });

  describe('DefaultConfig', () => {
    it('should provide default configuration', () => {
      const config: any = TestBed.inject(DefaultConfig);
      expect(config).toEqual({ a: 'default a', c: 'default c' });
    });
  });

  describe('RootConfig', () => {
    it('should provide root configuration', () => {
      const config: any = TestBed.inject(RootConfig);
      expect(config).toEqual({ a: 'root a', b: 'root b' });
    });
  });
});

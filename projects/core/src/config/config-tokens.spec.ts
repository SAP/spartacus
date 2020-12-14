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
        provideConfig({ a: 'root a' }),
        provideDefaultConfig({ a: 'default a' }),
        provideConfig({ b: 'root b' }),
        provideDefaultConfig({ c: 'default c' }),
      ],
    });
  });

  describe('Config', () => {
    it('should provide configuration', () => {
      const config = TestBed.inject(Config);
      expect(config).toEqual({ a: 'root a', b: 'root b', c: 'default c' });
    });
  });

  describe('DefaultConfig', () => {
    it('should provide default configuration', () => {
      const config = TestBed.inject(DefaultConfig);
      expect(config).toEqual({ a: 'default a', c: 'default c' });
    });
  });

  describe('RootConfig', () => {
    it('should provide root configuration', () => {
      const config = TestBed.inject(RootConfig);
      expect(config).toEqual({ a: 'root a', b: 'root b' });
    });
  });
});

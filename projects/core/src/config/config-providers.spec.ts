import {
  ConfigChunk,
  DefaultConfigChunk,
  provideConfig,
  provideConfigFactory,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';

describe('Config Providers', () => {
  const testConfig = { test: 'test' };
  const testConfigFactory = () => ({
    test: 'test',
  });

  describe('provideConfig', () => {
    it('should return ConfigChunk provider', () => {
      const provider = provideConfig(testConfig);
      expect(provider.provide).toBe(ConfigChunk);
      expect(provider.multi).toBeTruthy();
      expect(provider.useValue).toBe(testConfig);
    });
  });
  describe('provideConfigFactory', () => {
    it('should return ConfigChunk factory provider', () => {
      const provider = provideConfigFactory(testConfigFactory);
      expect(provider.provide).toBe(ConfigChunk);
      expect(provider.multi).toBeTruthy();
      expect(provider.useFactory).toBe(testConfigFactory);
    });
  });
  describe('provideDefaultConfig', () => {
    it('should return DefaultConfigChunk provider', () => {
      const provider = provideDefaultConfig(testConfig);
      expect(provider.provide).toBe(DefaultConfigChunk);
      expect(provider.multi).toBeTruthy();
      expect(provider.useValue).toBe(testConfig);
    });
  });
  describe('provideDefaultConfigFactory', () => {
    it('should return DefaultConfigChunk factory provider', () => {
      const provider = provideDefaultConfigFactory(testConfigFactory);
      expect(provider.provide).toBe(DefaultConfigChunk);
      expect(provider.multi).toBeTruthy();
      expect(provider.useFactory).toBe(testConfigFactory);
    });
  });
});

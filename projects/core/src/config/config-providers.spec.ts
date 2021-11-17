import {
  ConfigChunk,
  DefaultConfigChunk,
  provideConfig,
  provideConfigFactory,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { Config } from './config-tokens';

describe('Config Providers', () => {
  const testConfig = { test: 'test' };
  const testConfigFactory = () => ({
    test: 'test',
  });

  describe('provideConfig', () => {
    it('should return ConfigChunk provider', () => {
      const provider = provideConfig(testConfig as Config);
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
      const provider = provideDefaultConfig(testConfig as Config);
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

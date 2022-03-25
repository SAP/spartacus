import { FactoryProvider, ValueProvider } from '@angular/core';
import { Config, ConfigChunk, DefaultConfigChunk } from './config-tokens';

/**
 * Helper function to provide configuration chunk using ConfigChunk token
 *
 * To provide default configuration in libraries provideDefaultConfig should be used instead.
 *
 * @param config Config object to merge with the global configuration
 */
export function provideConfig(
  config: Config = {},
  defaultConfig = false
): ValueProvider {
  return {
    provide: defaultConfig ? DefaultConfigChunk : ConfigChunk,
    useValue: config,
    multi: true,
  };
}

/**
 * Helper function to provide configuration with factory function, using ConfigChunk token
 *
 * To provide default configuration in libraries provideDefaultConfigFactory should be used instead.
 *
 * @param configFactory Factory Function that will generate config object
 * @param deps Optional dependencies to a factory function
 */
export function provideConfigFactory(
  configFactory: Function,
  deps?: any[],
  defaultConfig = false
): FactoryProvider {
  return {
    provide: defaultConfig ? DefaultConfigChunk : ConfigChunk,
    useFactory: configFactory,
    multi: true,
    deps: deps,
  };
}

/**
 * Helper function to provide default configuration chunk using DefaultConfigChunk token
 *
 * @param config Config object to merge with the default configuration
 */
export function provideDefaultConfig(config: Config = {}): ValueProvider {
  return {
    provide: DefaultConfigChunk,
    useValue: config,
    multi: true,
  };
}

/**
 * Helper function to provide default configuration with factory function, using DefaultConfigChunk token
 *
 * @param configFactory Factory Function that will generate config object
 * @param deps Optional dependencies to a factory function
 */
export function provideDefaultConfigFactory(
  configFactory: Function,
  deps?: any[]
): FactoryProvider {
  return {
    provide: DefaultConfigChunk,
    useFactory: configFactory,
    multi: true,
    deps: deps,
  };
}

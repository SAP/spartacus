import { CommonModule } from '@angular/common';
import {
  InjectionToken,
  ModuleWithProviders,
  NgModule,
  Provider,
} from '@angular/core';
import { deepMerge } from './utils/deep-merge';

/**
 * Global Configuration injection token, can be used to inject configuration to any part of the app
 */
export const Config = new InjectionToken('Configuration');

/**
 * Config chunk token, can be used to provide configuration chunk and contribute to the global configuration object.
 * Should not be used directly, use `provideConfig` or import `ConfigModule.withConfig` instead.
 */
export const ConfigChunk = new InjectionToken('ConfigurationChunk');

/**
 * Config chunk token, can be used to provide configuration chunk and contribute to the default configuration.
 * Should not be used directly, use `provideDefaultConfig` or `provideDefaultConfigFactory` instead.
 *
 * General rule is, that all config provided in libraries should be provided as default config.
 */
export const DefaultConfigChunk = new InjectionToken(
  'DefaultConfigurationChunk'
);

/**
 * Helper function to provide configuration chunk using ConfigChunk token
 *
 * To provide default configuration in libraries provideDefaultConfig should be used instead.
 *
 * @param config Config object to merge with the global configuration
 */
export function provideConfig(
  config: any = {},
  defaultConfig = false
): Provider {
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
): Provider {
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
export function provideDefaultConfig(config: any = {}): Provider {
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
): Provider {
  return {
    provide: DefaultConfigChunk,
    useFactory: configFactory,
    multi: true,
    deps: deps,
  };
}

/**
 * Factory function that merges all configurations chunks. Should not be used directly without explicit reason.
 *
 */
export function configurationFactory(
  configChunks: any[] = [],
  defaultConfigChunks: any[] = []
) {
  const config = deepMerge(
    {},
    ...(defaultConfigChunks ?? []),
    ...(configChunks ?? [])
  );
  return config;
}

@NgModule({
  imports: [CommonModule],
  declarations: [],
})
export class ConfigModule {
  /**
   * Import ConfigModule and contribute config to the global configuration
   *
   * To provide default configuration in libraries provideDefaultConfig should be used instead.
   *
   * @param config Config object to merge with the global configuration
   */
  static withConfig(config: object): ModuleWithProviders<ConfigModule> {
    return {
      ngModule: ConfigModule,
      providers: [provideConfig(config)],
    };
  }

  /**
   * Import ConfigModule and contribute config to the global configuration using factory function
   *
   * To provide default configuration in libraries provideDefaultConfigFactory should be used instead.
   *
   * @param configFactory Factory function that will generate configuration
   * @param deps Optional dependencies to factory function
   */
  static withConfigFactory(
    configFactory: Function,
    deps?: any[]
  ): ModuleWithProviders<ConfigModule> {
    return {
      ngModule: ConfigModule,
      providers: [provideConfigFactory(configFactory, deps)],
    };
  }

  /**
   * Module with providers, should be imported only once, if possible, at the root of the app.
   *
   * @param config
   */
  static forRoot(config: any = {}): ModuleWithProviders<ConfigModule> {
    return {
      ngModule: ConfigModule,
      providers: [
        provideConfig(config),
        {
          provide: Config,
          useFactory: configurationFactory,
          deps: [
            [new Optional(), ConfigChunk],
            [new Optional(), DefaultConfigChunk],
          ],
        },
      ],
    };
  }
}

import {
  InjectionToken,
  ModuleWithProviders,
  NgModule,
  Provider,
  Optional,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  defaultServerConfig,
  ServerConfig,
} from './server-config/server-config';
import { deepMerge } from './utils/deep-merge';
import {
  ConfigValidator,
  ConfigValidatorToken,
  validateConfig,
} from './utils/config-validator';

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
 * Helper function to provide configuration chunk using ConfigChunk token
 *
 * @param config Config object to merge with the global configuration
 */
export function provideConfig(config: any = {}): Provider {
  return { provide: ConfigChunk, useValue: config, multi: true };
}

/**
 * Helper function to provide configuration with factory function, using ConfigChunk token
 *
 * @param configFactory Factory Function that will generate config object
 * @param deps Optional dependencies to a factory function
 */
export function provideConfigFactory(
  configFactory: Function,
  deps?: any[]
): Provider {
  return {
    provide: ConfigChunk,
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
  configChunks: any[],
  configValidators: ConfigValidator[]
) {
  const config = deepMerge({}, ...configChunks);
  if (!config.production) {
    validateConfig(config, configValidators || []);
  }
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
        { provide: ServerConfig, useExisting: Config },
        provideConfig(defaultServerConfig),
        provideConfig(config),
        {
          provide: Config,
          useFactory: configurationFactory,
          deps: [ConfigChunk, [new Optional(), ConfigValidatorToken]],
        },
      ],
    };
  }
}

import {
  InjectionToken,
  ModuleWithProviders,
  NgModule,
  Provider
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  defaultServerConfig,
  ServerConfig
} from './server-config/server-config';
import { deepMerge } from './utils/deep-merge';
import { serverConfigValidator } from './server-config/server-config-validator';
import {
  ConfigValidator,
  ConfigValidatorToken,
  provideConfigValidator,
  validateConfig
} from './utils/config-validator';
import { serverConfigFactory } from './server-config/server-config-factory';
import { Meta } from '@angular/platform-browser';

export const Config = new InjectionToken('Configuration');
export const ConfigChunk = new InjectionToken('ConfigurationChunk');

export function provideConfig(config: any = {}): Provider {
  return { provide: ConfigChunk, useValue: config, multi: true };
}

export function provideConfigFactory(
  configFactory: Function,
  deps?: any[]
): Provider {
  return {
    provide: ConfigChunk,
    useFactory: configFactory,
    multi: true,
    deps: deps
  };
}

export function configurationFactory(
  configChunks: any[],
  configValidators: ConfigValidator[]
) {
  const config = deepMerge({}, ...configChunks);
  if (!config.production) {
    validateConfig(config, configValidators);
  }
  return config;
}

@NgModule({
  imports: [CommonModule],
  declarations: []
})
export class ConfigModule {
  static withConfig(config: object): ModuleWithProviders {
    return {
      ngModule: ConfigModule,
      providers: [provideConfig(config)]
    };
  }

  static withConfigFactory(
    configFactory: Function,
    deps?: any[]
  ): ModuleWithProviders {
    return {
      ngModule: ConfigModule,
      providers: [provideConfigFactory(configFactory, deps)]
    };
  }

  static forRoot(config: any = {}): ModuleWithProviders {
    return {
      ngModule: ConfigModule,
      providers: [
        { provide: ServerConfig, useExisting: Config },
        provideConfig(defaultServerConfig),
        provideConfigFactory(serverConfigFactory, [Meta]),
        provideConfig(config),
        {
          provide: Config,
          useFactory: configurationFactory,
          deps: [ConfigChunk, ConfigValidatorToken]
        },
        provideConfigValidator(serverConfigValidator)
      ]
    };
  }
}

import {
  InjectionToken,
  ModuleWithProviders,
  NgModule, Provider
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { defaultServerConfig } from './server-config';

export const Config = new InjectionToken('Configuration');
export const ConfigChunk = new InjectionToken('ConfigurationChunk');

export function provideConfig(config: any = {}): Provider {
  return { provide: ConfigChunk, useValue: config, multi: true };
}

export function configurationFactory(configChunks: any[]) {
  return Object.assign({}, ...configChunks);
}

@NgModule({
  imports: [CommonModule],
  declarations: []
})
export class ConfigModule {
  static withConfig(config: any): ModuleWithProviders {
    return {
      ngModule: ConfigModule,
      providers: [
        provideConfig(config)
      ]
    };
  }

  static forRoot(config: any = {}): ModuleWithProviders {
    return {
      ngModule: ConfigModule,
      providers: [
        provideConfig(defaultServerConfig),
        provideConfig(config),
        {
          provide: Config,
          useFactory: configurationFactory,
          deps: [ConfigChunk]
        }
      ]
    };
  }
}

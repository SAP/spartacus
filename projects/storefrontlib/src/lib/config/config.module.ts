import {
  InjectionToken,
  ModuleWithProviders,
  NgModule,
  Provider
} from '@angular/core';
import { CommonModule } from '@angular/common';

const ConfigurationChunk = new InjectionToken('CONFIG_TOKEN');
export const Configuration = new InjectionToken('CONFIGURATION');

export function provideConfig(config: any) {
  return { provide: ConfigurationChunk, useValue: config, multi: true };
}

function configurationFactory(configChunks: any[]) {
  return configChunks.reduce((acc, curr) => ({ ...acc, ...curr }), {});
}

@NgModule({
  imports: [CommonModule],
  declarations: []
})
export class ConfigModule {
  static withConfig(config: any): ModuleWithProviders {
    return {
      ngModule: ConfigModule,
      providers: [provideConfig(config)]
    };
  }

  static forRoot(config?: any): ModuleWithProviders {
    const providers: Provider[] = [
      {
        provide: Configuration,
        useFactory: configurationFactory,
        deps: [ConfigurationChunk]
      }
    ];
    if (config) {
      providers.push(provideConfig(config));
    }

    return {
      ngModule: ConfigModule,
      providers: providers
    };
  }
}

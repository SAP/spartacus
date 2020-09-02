import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideConfig, provideConfigFactory } from './config-providers';

@NgModule({})
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
      providers: [provideConfig(config)],
    };
  }
}

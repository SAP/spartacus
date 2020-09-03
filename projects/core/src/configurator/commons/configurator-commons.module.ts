import { ModuleWithProviders, NgModule } from '@angular/core';
import { ConfiguratorStoreModule } from './store/configurator-store.module';

@NgModule({ imports: [ConfiguratorStoreModule] })
export class ConfiguratorCommonsModule {
  static forRoot(): ModuleWithProviders<ConfiguratorCommonsModule> {
    return {
      ngModule: ConfiguratorCommonsModule,
      providers: [],
    };
  }
}

import { ModuleWithProviders, NgModule } from '@angular/core';
import { ConfiguratorTextfieldService } from './facade/configurator-textfield.service';
import { ConfiguratorTextfieldStoreModule } from './store/configurator-textfield-store.module';

@NgModule({ imports: [ConfiguratorTextfieldStoreModule] })
export class ConfiguratorTextfieldModule {
  static forRoot(): ModuleWithProviders<ConfiguratorTextfieldModule> {
    return {
      ngModule: ConfiguratorTextfieldModule,
      providers: [ConfiguratorTextfieldService],
    };
  }
}

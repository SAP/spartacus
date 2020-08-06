import { ModuleWithProviders, NgModule } from '@angular/core';
import { ConfiguratorCartService } from './facade/configurator-cart.service';
import { ConfiguratorCommonsService } from './facade/configurator-commons.service';
import { ConfiguratorGroupStatusService } from './facade/configurator-group-status.service';
import { ConfiguratorGroupUtilsService } from './facade/configurator-group-utils.service';
import { ConfiguratorGroupsService } from './facade/configurator-groups.service';
import { ConfiguratorStoreModule } from './store/configurator-store.module';

@NgModule({ imports: [ConfiguratorStoreModule] })
export class ConfiguratorCommonsModule {
  static forRoot(): ModuleWithProviders<ConfiguratorCommonsModule> {
    return {
      ngModule: ConfiguratorCommonsModule,
      providers: [
        ConfiguratorCommonsService,
        ConfiguratorCartService,
        ConfiguratorGroupsService,
        ConfiguratorGroupUtilsService,
        ConfiguratorGroupStatusService,
      ],
    };
  }
}

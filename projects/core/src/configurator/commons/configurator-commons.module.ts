import { ModuleWithProviders, NgModule } from '@angular/core';
import { ConfiguratorCommonsService } from './facade/configurator-commons.service';
import { ConfiguratorGroupsService } from './facade/configurator-groups.service';
import { ConfiguratorStoreModule } from './store/configurator-store.module';
import { ConfiguratorGroupUtilsService } from './facade/configurator-group-utils.service';
import { ConfiguratorGroupStatusService } from './facade/configurator-group-status.service';

@NgModule({ imports: [ConfiguratorStoreModule] })
export class ConfiguratorCommonsModule {
  static forRoot(): ModuleWithProviders<ConfiguratorCommonsModule> {
    return {
      ngModule: ConfiguratorCommonsModule,
      providers: [
        ConfiguratorCommonsService,
        ConfiguratorGroupsService,
        ConfiguratorGroupUtilsService,
        ConfiguratorGroupStatusService,
      ],
    };
  }
}

import { ModuleWithProviders, NgModule } from '@angular/core';
import { ConfiguratorCommonsService } from './facade/configurator-commons.service';
import { ConfiguratorGroupsService } from './facade/configurator-groups.service';
import { ConfiguratorStoreModule } from './store/configurator-store.module';
import { ConfiguratorGroupStatusService } from './facade/configurator-group-status.service';
import { ConfiguratorGroupUtilsService } from './facade/configurator-group-utils.service';

@NgModule({ imports: [ConfiguratorStoreModule] })
export class ConfiguratorCommonsModule {
  static forRoot(): ModuleWithProviders<ConfiguratorCommonsModule> {
    return {
      ngModule: ConfiguratorCommonsModule,
      providers: [
        ConfiguratorGroupUtilsService,
        ConfiguratorGroupStatusService,
        ConfiguratorCommonsService,
        ConfiguratorGroupsService,
      ],
    };
  }
}

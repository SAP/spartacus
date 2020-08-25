import { ModuleWithProviders, NgModule } from '@angular/core';
import { ConfiguratorCartService } from './configurator-cart.service';
import { ConfiguratorCommonsService } from './configurator-commons.service';
import { ConfiguratorGroupStatusService } from './configurator-group-status.service';
import { ConfiguratorGroupUtilsService } from './configurator-group-utils.service';
import { ConfiguratorGroupsService } from './configurator-groups.service';

@NgModule({})
export class CommonConfiguratorFacadeModule {
  static forRoot(): ModuleWithProviders<CommonConfiguratorFacadeModule> {
    return {
      ngModule: CommonConfiguratorFacadeModule,
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

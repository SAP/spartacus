import { ModuleWithProviders, NgModule } from '@angular/core';
import { ConfiguratorCartService } from './configurator-cart.service';
import { ConfiguratorCommonsService } from './configurator-commons.service';
import { ConfiguratorGroupStatusService } from './configurator-group-status.service';
import { ConfiguratorGroupsService } from './configurator-groups.service';
import { ConfiguratorFacadeUtilsService } from './utils/configurator-facade-utils.service';

@NgModule({})
export class CommonConfiguratorFacadeModule {
  static forRoot(): ModuleWithProviders<CommonConfiguratorFacadeModule> {
    return {
      ngModule: CommonConfiguratorFacadeModule,
      providers: [
        ConfiguratorCommonsService,
        ConfiguratorCartService,
        ConfiguratorGroupsService,
        ConfiguratorFacadeUtilsService,
        ConfiguratorGroupStatusService,
      ],
    };
  }
}

import { NgModule } from '@angular/core';
import { ConfiguratorCommonsConnector } from './connectors/configurator-commons.connector';
import { ConfiguratorStateModule } from './state/configurator-state.module';

@NgModule({
  imports: [ConfiguratorStateModule],
  providers: [ConfiguratorCommonsConnector],
})
export class CommonConfiguratorCoreModule {}

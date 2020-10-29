import { NgModule } from '@angular/core';
import { ConfiguratorCommonsConnector } from './connectors/configurator-commons.connector';
import { ConfiguratorStateModule } from './state/configurator-state.module';

/**
 * Exposes the rulebased configurator core entities.
 * Explicit providing of connector because otherwise lazy loading does not work
 */
@NgModule({
  imports: [ConfiguratorStateModule],
  providers: [ConfiguratorCommonsConnector],
})
export class RulebasedConfiguratorCoreModule {}

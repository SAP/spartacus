import { NgModule } from '@angular/core';
import { RulebasedConfiguratorConnector } from './connectors/rulebased-configurator.connector';
import { RulebasedConfiguratorStateModule } from './state/rulebased-configurator-state.module';

/**
 * Exposes the rulebased configurator core entities.
 * Explicit providing of connector because otherwise lazy loading does not work
 */
@NgModule({
  imports: [RulebasedConfiguratorStateModule],
  providers: [RulebasedConfiguratorConnector],
})
export class RulebasedConfiguratorCoreModule {}

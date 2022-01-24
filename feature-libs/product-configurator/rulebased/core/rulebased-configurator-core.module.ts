import { NgModule } from '@angular/core';
import { RulebasedConfiguratorConnector } from './connectors/rulebased-configurator.connector';
import { ConfiguratorRouterModule } from './facade/routing/configurator-router.module';
import { RulebasedConfiguratorPersistenceModule } from './persistence/rulebased-configurator-persistence.module';
import { RulebasedConfiguratorStateModule } from './state/rulebased-configurator-state.module';

/**
 * Exposes the rulebased configurator core entities.
 * Explicit providing of connector because otherwise lazy loading does not work
 */
@NgModule({
  imports: [
    RulebasedConfiguratorStateModule,
    ConfiguratorRouterModule,
    RulebasedConfiguratorStateModule,
    RulebasedConfiguratorPersistenceModule.forRoot(),
  ],
  providers: [RulebasedConfiguratorConnector],
})
export class RulebasedConfiguratorCoreModule {}

import { NgModule } from '@angular/core';
import { RulebasedConfiguratorConnector } from './connectors/rulebased-configurator.connector';
import { RulebasedConfiguratorEventModule } from './events/rulebased-configurator-event.module';
import { RulebasedConfiguratorPersistenceModule } from './persistence/rulebased-configurator-persistence.module';
import { RulebasedConfiguratorStateModule } from './state/rulebased-configurator-state.module';

/**
 * Exposes the rulebased configurator core entities.
 * Explicit providing of connector because otherwise lazy loading does not work
 */
@NgModule({
  imports: [
    RulebasedConfiguratorStateModule,
    RulebasedConfiguratorEventModule,
    RulebasedConfiguratorPersistenceModule.forRoot(),
  ],
  providers: [RulebasedConfiguratorConnector],
})
export class RulebasedConfiguratorCoreModule {}

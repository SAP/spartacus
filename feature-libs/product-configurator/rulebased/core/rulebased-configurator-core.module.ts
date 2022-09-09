import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultConfiguratorCoreConfig } from './config/default-configurator-core.config';
import { RulebasedConfiguratorConnector } from './connectors/rulebased-configurator.connector';
import { ConfiguratorRouterModule } from './facade/routing/configurator-router.module';
import { RulebasedConfiguratorStateModule } from './state/rulebased-configurator-state.module';

/**
 * Exposes the rulebased configurator core entities.
 * Explicit providing of connector because otherwise lazy loading does not work
 */
@NgModule({
  imports: [RulebasedConfiguratorStateModule, ConfiguratorRouterModule],
  providers: [
    RulebasedConfiguratorConnector,
    provideDefaultConfig(defaultConfiguratorCoreConfig),
  ],
})
export class RulebasedConfiguratorCoreModule {}

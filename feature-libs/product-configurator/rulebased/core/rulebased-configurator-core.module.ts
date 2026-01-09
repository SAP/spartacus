/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultConfiguratorCoreConfig } from './config/default-configurator-core.config';
import { RulebasedConfiguratorConnector } from './connectors/rulebased-configurator.connector';
import { ConfiguratorRouterModule } from './facade/routing/configurator-router.module';
import { RulebasedConfiguratorStateModule } from './state/rulebased-configurator-state.module';
import { ConfiguratorLogoutEventListener } from './events/configurator-logout-event.listener';
import { ConfiguratorLanguageSetEventListener } from './events/configurator-language-set-event.listener';

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
export class RulebasedConfiguratorCoreModule {
  constructor(
    _configuratorLogoutEventListener: ConfiguratorLogoutEventListener,
    _configuratorLanguageSetEventListener: ConfiguratorLanguageSetEventListener
  ) {
    // Intentional empty constructor
  }
}

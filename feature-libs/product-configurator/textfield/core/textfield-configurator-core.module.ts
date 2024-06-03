/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ConfiguratorTextfieldConnector } from './connectors/configurator-textfield.connector';
import { ConfiguratorTextfieldStoreModule } from './state/configurator-textfield-store.module';

/**
 * Exposes the textfield configurator core entities.
 * Explicit providing of connector because otherwise lazy loading does not work
 */
@NgModule({
  imports: [ConfiguratorTextfieldStoreModule],
  providers: [ConfiguratorTextfieldConnector],
})
export class TextfieldConfiguratorCoreModule {}

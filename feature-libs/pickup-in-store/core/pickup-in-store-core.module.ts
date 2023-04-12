/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultPickupInStoreConfig } from './config/index';
import { PickupLocationConnector, StockConnector } from './connectors/index';
import { facadeProviders } from './facade/index';
import { PickupInStoreStoreModule } from './store/index';

@NgModule({
  imports: [PickupInStoreStoreModule],
  providers: [
    provideDefaultConfig(defaultPickupInStoreConfig),
    StockConnector,
    PickupLocationConnector,
    ...facadeProviders,
  ],
})
export class PickupInStoreCoreModule {}

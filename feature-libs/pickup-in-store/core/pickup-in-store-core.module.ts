/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { UserAccountModule } from '@spartacus/user';
import { defaultPickupInStoreConfig } from './config/index';
import { StockConnector } from './connectors/index';
import { facadeProviders } from './facade/index';
import { PreferredStoreService } from './services/index';
import { PickupInStoreStoreModule } from './store/index';

@NgModule({
  imports: [PickupInStoreStoreModule, UserAccountModule],
  providers: [
    provideDefaultConfig(defaultPickupInStoreConfig),
    StockConnector,
    PreferredStoreService,
    ...facadeProviders,
  ],
})
export class PickupInStoreCoreModule {}

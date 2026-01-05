/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultStoreFinderConfig } from './config/default-store-finder-config';
import { StoreFinderStoreModule } from './store/store-finder-store.module';
import { StoreFinderConnector } from './connectors/store-finder.connector';
import { facadeProviders } from './facade/index';

@NgModule({
  imports: [StoreFinderStoreModule],
  providers: [
    provideDefaultConfig(defaultStoreFinderConfig),
    StoreFinderConnector,
    ...facadeProviders,
  ],
})
export class StoreFinderCoreModule {}

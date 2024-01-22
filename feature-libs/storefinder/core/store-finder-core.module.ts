/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultStoreFinderConfig } from './config/default-store-finder-config';
import { StoreFinderConnector } from './connectors/store-finder.connector';
import { StoreFinderStoreModule } from './store/store-finder-store.module';

@NgModule({
  imports: [StoreFinderStoreModule],
  providers: [
    provideDefaultConfig(defaultStoreFinderConfig),
    StoreFinderConnector,
  ],
})
export class StoreFinderCoreModule {}

/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { BundleConnector } from './connectors/bundle.connector';
import { BundleService } from './facade';
import { BundleStoreModule } from './store/bundle-store.module';

@NgModule({
  imports: [BundleStoreModule],
  providers: [
    BundleConnector,
    BundleService
  ],
})
export class BundleCoreModule {}

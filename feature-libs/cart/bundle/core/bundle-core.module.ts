/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { BundleStoreModule } from './store/bundle-store.module';
import { BundleConnector } from './connectors/bundle.connector';

@NgModule({
  imports: [BundleStoreModule],
  providers: [BundleConnector],
})
export class BundleCoreModule {}

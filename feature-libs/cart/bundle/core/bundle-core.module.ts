/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { PageMetaResolver } from '@spartacus/core';
import { BundleConnector } from './connectors/bundle.connector';
import { BundleService } from './facade';
import { BundlePageMetaResolver } from './services/bundle-page-meta.resolver';
import { BundleStoreModule } from './store/bundle-store.module';

@NgModule({
  imports: [BundleStoreModule],
  providers: [
    BundleConnector,
    BundleService,
    {
      provide: PageMetaResolver,
      useExisting: BundlePageMetaResolver,
      multi: true,
    },
  ],
})
export class BundleCoreModule {}

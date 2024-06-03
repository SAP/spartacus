/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';

import { defaultOccStoreFinderConfig } from './adapters/default-occ-store-finder-config';
import { OccStoreFinderAdapter } from './adapters/occ-store-finder.adapter';
import { provideDefaultConfig } from '@spartacus/core';
import { StoreFinderAdapter } from '@spartacus/storefinder/core';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOccStoreFinderConfig),
    { provide: StoreFinderAdapter, useClass: OccStoreFinderAdapter },
  ],
})
export class StoreFinderOccModule {}

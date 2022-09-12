/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { StoreFinderCoreModule } from '@commerce-storefront-toolset/storefinder/core';
import { StoreFinderOccModule } from '@commerce-storefront-toolset/storefinder/occ';
import { StoreFinderComponentsModule } from '@commerce-storefront-toolset/storefinder/components';

@NgModule({
  imports: [
    StoreFinderCoreModule,
    StoreFinderOccModule,
    StoreFinderComponentsModule,
  ],
})
export class StoreFinderModule {}

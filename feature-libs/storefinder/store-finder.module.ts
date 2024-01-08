/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { StoreFinderComponentsModule } from '@spartacus/storefinder/components';
import { StoreFinderCoreModule } from '@spartacus/storefinder/core';
import { StoreFinderOccModule } from '@spartacus/storefinder/occ';

@NgModule({
  imports: [
    StoreFinderCoreModule,
    StoreFinderOccModule,
    StoreFinderComponentsModule,
  ],
})
export class StoreFinderModule {}

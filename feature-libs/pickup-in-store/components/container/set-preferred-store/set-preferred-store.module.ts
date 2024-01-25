/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { StoreFinderOutlets } from '@spartacus/storefinder/root';
import {
  IconModule,
  OutletPosition,
  provideOutlet,
} from '@spartacus/storefront';
import { SetPreferredStoreComponent } from './set-preferred-store.component';

@NgModule({
  imports: [CommonModule, IconModule, I18nModule],
  exports: [SetPreferredStoreComponent],
  declarations: [SetPreferredStoreComponent],
  providers: [
    provideOutlet({
      id: StoreFinderOutlets.PREFERRED_STORE,
      position: OutletPosition.REPLACE,
      component: SetPreferredStoreComponent,
    }),
  ],
})
export class SetPreferredStoreModule {}

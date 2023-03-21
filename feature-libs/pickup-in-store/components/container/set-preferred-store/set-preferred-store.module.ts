/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { StoreFinderOutlets } from '@spartacus/storefinder/root';
import {
  IconModule,
  OutletModule,
  OutletPosition,
  provideOutlet,
} from '@spartacus/storefront';
import { SetPreferredStoreComponent } from './set-preferred-store.component';

@NgModule({
  imports: [CommonModule, IconModule, I18nModule, OutletModule.forChild()],
  exports: [SetPreferredStoreComponent],
  declarations: [SetPreferredStoreComponent],
  providers: [
    // TODO we may need to turn this into an enum. Don't want to to though as then the module which doesn't contain the enum, becomes dependent on the one that does
    provideOutlet({
      id: StoreFinderOutlets.PREFERRED_STORE,
      position: OutletPosition.REPLACE,
      component: SetPreferredStoreComponent,
    }),
  ],
})
export class SetPreferredStoreModule {}

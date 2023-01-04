/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
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
    // TODO we may need to turn this into an enum. Don't want to to though as then the module which doesn't contain the enum, becomes dependent on the one that does
    provideOutlet({
      id: 'cx-pick-up-in-store-make-my-store',
      position: OutletPosition.REPLACE,
      component: SetPreferredStoreComponent,
    }),
  ],
})
export class SetPreferredStoreModule {}

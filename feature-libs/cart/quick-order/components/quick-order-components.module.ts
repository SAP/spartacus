/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuickOrderOrderEntriesContextToken } from '@spartacus/cart/quick-order/root';
import { CartQuickOrderFormModule } from './cart-quick-order-form/cart-quick-order-form.module';
import { QuickOrderOrderEntriesContext } from './page-context/quick-order-order-entries.context';
import { QuickOrderListModule } from './quick-order/quick-order-list.module';

@NgModule({
  imports: [RouterModule, QuickOrderListModule, CartQuickOrderFormModule],
  providers: [
    {
      provide: QuickOrderOrderEntriesContextToken,
      useExisting: QuickOrderOrderEntriesContext,
    },
  ],
})
export class QuickOrderComponentsModule {}

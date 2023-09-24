/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken, NgModule } from '@angular/core';
import { OrderComponentsModule } from '@spartacus/order/components';
import { OrderCoreModule } from '@spartacus/order/core';
import { OrderOccModule } from '@spartacus/order/occ';
export const MYACCOUNT_ENHANCED_UI = new InjectionToken<boolean>(
  'MYACCOUNT_ENHANCED_UI',
  {
    providedIn: 'root',
    factory: () => true,
  }
);
@NgModule({
  imports: [OrderCoreModule, OrderOccModule, OrderComponentsModule],
})
export class OrderModule {}

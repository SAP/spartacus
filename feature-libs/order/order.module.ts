/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OrderComponentsModule } from '@commerce-storefront-toolset/order/components';
import { OrderCoreModule } from '@commerce-storefront-toolset/order/core';
import { OrderOccModule } from '@commerce-storefront-toolset/order/occ';

@NgModule({
  imports: [OrderCoreModule, OrderOccModule, OrderComponentsModule],
})
export class OrderModule {}

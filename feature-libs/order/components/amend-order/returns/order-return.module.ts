/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ReturnOrderConfirmationModule } from './return-order-confirmation/return-order-confirmation.module';
import { ReturnOrderModule } from './return-order/return-order.module';

@NgModule({
  imports: [ReturnOrderModule, ReturnOrderConfirmationModule],
})
export class OrderReturnModule {}

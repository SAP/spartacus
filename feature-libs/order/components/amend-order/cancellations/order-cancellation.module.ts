/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CancelOrderConfirmationModule } from './cancel-order-confirmation/cancel-order-confirmation.module';
import { CancelOrderModule } from './cancel-order/cancel-order.module';

@NgModule({
  imports: [CancelOrderModule, CancelOrderConfirmationModule],
})
export class OrderCancellationModule {}

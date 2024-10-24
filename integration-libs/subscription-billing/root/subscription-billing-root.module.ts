/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { SubscriptionProductModule } from './product/subscription-product.module';
@NgModule({
  imports: [SubscriptionProductModule],
})
export class SubscriptionBillingRootModule {}

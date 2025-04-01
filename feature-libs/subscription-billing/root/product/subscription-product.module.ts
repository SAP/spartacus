/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { SubscriptionProductPriceModule } from './price/subscription-product-price.module';

@NgModule({
  imports: [SubscriptionProductPriceModule],
})
export class SubscriptionProductModule {}

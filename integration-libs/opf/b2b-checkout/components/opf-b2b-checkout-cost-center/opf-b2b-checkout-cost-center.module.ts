/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckoutCostCenterModule } from '@spartacus/checkout/b2b/components';
import { I18nModule } from '@spartacus/core';
import { OpfB2bCheckoutCostCenterComponent } from './opf-b2b-checkout-cost-center.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    CheckoutCostCenterModule,
    OpfB2bCheckoutCostCenterComponent,
  ],
  exports: [OpfB2bCheckoutCostCenterComponent],
})
export class OpfB2bCheckoutCostCenterModule {}

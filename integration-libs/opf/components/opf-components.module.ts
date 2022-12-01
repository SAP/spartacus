/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OPFCheckoutPaymentsModule } from './opf-checkout-payment-review/opf-checkout-payment-review.module';

@NgModule({
  imports: [OPFCheckoutPaymentsModule],
})
export class OpfComponentsModule {}

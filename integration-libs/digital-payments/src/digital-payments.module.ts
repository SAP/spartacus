/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { DpCheckoutModule } from './checkout/dp-checkout.module';

@NgModule({
  imports: [DpCheckoutModule],
})
export class DigitalPaymentsModule {}

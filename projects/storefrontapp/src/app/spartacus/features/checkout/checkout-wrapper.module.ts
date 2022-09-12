/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Type } from '@angular/core';
import { CheckoutB2BModule } from '@commerce-storefront-toolset/checkout/b2b';
import { CheckoutModule } from '@commerce-storefront-toolset/checkout/base';
import { CheckoutScheduledReplenishmentModule } from '@commerce-storefront-toolset/checkout/scheduled-replenishment';
import { DigitalPaymentsModule } from '@commerce-storefront-toolset/digital-payments';
import { environment } from '../../../../environments/environment';

const extensions: Type<any>[] = [];

if (environment.b2b) {
  extensions.push(CheckoutB2BModule, CheckoutScheduledReplenishmentModule);
}

if (environment.digitalPayments) {
  extensions.push(DigitalPaymentsModule);
}

@NgModule({
  imports: [CheckoutModule, ...extensions],
})
export class CheckoutWrapperModule {}

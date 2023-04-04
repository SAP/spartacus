/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Type } from '@angular/core';
import { CheckoutB2BModule } from '@spartacus/checkout/b2b';
import { CheckoutModule } from '@spartacus/checkout/base';
import { CheckoutScheduledReplenishmentModule } from '@spartacus/checkout/scheduled-replenishment';
import { environment } from '../../../../environments/environment';

const extensions: Type<any>[] = [];

if (environment.b2b) {
  extensions.push(CheckoutB2BModule, CheckoutScheduledReplenishmentModule);
}

@NgModule({
  imports: [CheckoutModule, ...extensions],
})
export class CheckoutWrapperModule {}

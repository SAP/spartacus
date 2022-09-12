/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CheckoutComponentsModule } from '@commerce-storefront-toolset/checkout/base/components';
import { CheckoutCoreModule } from '@commerce-storefront-toolset/checkout/base/core';
import { CheckoutOccModule } from '@commerce-storefront-toolset/checkout/base/occ';

@NgModule({
  imports: [CheckoutComponentsModule, CheckoutCoreModule, CheckoutOccModule],
})
export class CheckoutModule {}

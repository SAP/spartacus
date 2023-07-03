/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CheckoutComponentsModule } from '@spartacus/checkout/base/components';
import { CheckoutCoreModule } from '@spartacus/checkout/base/core';
import { CheckoutOccModule } from '@spartacus/checkout/base/occ';

@NgModule({
  imports: [CheckoutComponentsModule, CheckoutCoreModule, CheckoutOccModule],
})
export class CheckoutModule {}

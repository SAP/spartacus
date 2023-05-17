/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfCheckoutComponentsModule } from '@spartacus/opf/checkout/components';
import { OpfCheckoutCoreModule } from '@spartacus/opf/checkout/core';
import { OpfCheckoutOccModule } from '@spartacus/opf/checkout/occ';

@NgModule({
  imports: [
    OpfCheckoutOccModule,
    OpfCheckoutCoreModule,
    OpfCheckoutComponentsModule,
  ],
})
export class OpfCheckoutModule {}

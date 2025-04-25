/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  OpfCheckoutComponentsModule,
  OpfB2bCheckoutComponentsModule,
} from '@spartacus/opf/checkout/components';
import { OpfCheckoutCoreModule } from '@spartacus/opf/checkout/core';

@NgModule({
  imports: [
    OpfCheckoutCoreModule,
    OpfCheckoutComponentsModule,
    OpfB2bCheckoutComponentsModule,
  ],
})
export class OpfCheckoutModule {}

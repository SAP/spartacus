/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfCheckoutComponentsModule } from '@spartacus/opf/checkout/components';
import { OpfB2bCheckoutComponentsModule } from './b2b/opf-b2b-checkout-components.module';

@NgModule({
  imports: [OpfCheckoutComponentsModule, OpfB2bCheckoutComponentsModule], // TODO: Do not add B2B components to the B2C bundle
})
export class OpfCheckoutModule {}

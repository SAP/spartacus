/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfB2bCheckoutCoreModule } from '@spartacus/opf/b2b-checkout/core';
import { OpfB2bCheckoutComponentsModule } from '@spartacus/opf/b2b-checkout/components';

@NgModule({
  imports: [OpfB2bCheckoutCoreModule, OpfB2bCheckoutComponentsModule],
})
export class OpfB2bCheckoutModule {}

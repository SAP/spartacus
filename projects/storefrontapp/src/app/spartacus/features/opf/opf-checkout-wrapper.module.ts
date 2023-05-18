/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfCheckoutModule } from '@spartacus/opf/checkout';

@NgModule({
  imports: [OpfCheckoutModule],
})
export class OpfCheckoutWrapperModule {}

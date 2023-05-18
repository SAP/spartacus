/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfPaymentModule } from '@spartacus/opf/payment';

@NgModule({
  imports: [OpfPaymentModule],
})
export class OpfPaymentWrapperModule {}

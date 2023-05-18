/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfPaymentComponentsModule } from '@spartacus/opf/payment/components';
import { OpfPaymentCoreModule } from '@spartacus/opf/payment/core';
import { OpfPaymentOccModule } from '@spartacus/opf/payment/occ';

@NgModule({
  imports: [
    OpfPaymentOccModule,
    OpfPaymentCoreModule,
    OpfPaymentComponentsModule,
  ],
})
export class OpfPaymentModule {}

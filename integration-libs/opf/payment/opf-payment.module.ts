/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfPaymentCoreModule } from '@spartacus/opf/payment/core';
import { OpfApiPaymentModule } from '@spartacus/opf/payment/opf-api';
import { OpfPaymentOccModule } from '@spartacus/opf/payment/occ';

@NgModule({
  imports: [OpfPaymentCoreModule, OpfApiPaymentModule, OpfPaymentOccModule],
})
export class OpfPaymentModule {}

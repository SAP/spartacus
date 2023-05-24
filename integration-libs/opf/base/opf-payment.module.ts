/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfPaymentCoreModule } from 'integration-libs/opf/base/core/public_api';
import { OpfPaymentOccModule } from 'integration-libs/opf/base/occ/public_api';

@NgModule({
  imports: [OpfPaymentOccModule, OpfPaymentCoreModule],
})
export class OpfPaymentModule {}

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CpqDiscountModule } from './cpq-quote-discount/cpq-discount.module';

@NgModule({
  imports: [CpqDiscountModule],
})
export class CpqQuoteModule {}

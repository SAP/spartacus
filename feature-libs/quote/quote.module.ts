/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { QuoteCoreModule } from '@spartacus/quote/core';
import { QuoteComponentsModule } from '@spartacus/quote/components';
import { QuoteOccModule } from '@spartacus/quote/occ';

@NgModule({
  imports: [QuoteComponentsModule, QuoteCoreModule, QuoteOccModule],
})
export class QuoteModule {}

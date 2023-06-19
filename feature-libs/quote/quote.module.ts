/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { QuoteComponentsModule } from 'feature-libs/quote/components/public_api';
import { QuoteCoreModule } from 'feature-libs/quote/core/public_api';
import { QuoteOccModule } from 'feature-libs/quote/occ/public_api';

@NgModule({
  imports: [
    QuoteComponentsModule,
    QuoteCoreModule,
    QuoteOccModule,
  ],
})
export class QuoteModule {}

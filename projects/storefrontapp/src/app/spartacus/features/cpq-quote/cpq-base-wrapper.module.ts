/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Type } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { CpqQuoteDiscountModule } from '@spartacus/cpq-quote';
import { QuoteModule } from '@spartacus/quote';

const extensions: Type<any>[] = [];
if (environment.cpq) {
  extensions.push(CpqQuoteDiscountModule);
}
@NgModule({
  imports: [QuoteModule, ...extensions],
})
export class cpQBaseWrapperModule {}

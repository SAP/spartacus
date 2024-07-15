/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Type } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { CartBaseModule } from '@spartacus/cart/base';
import { EstimatedDeliveryDateModule } from '@spartacus/estimated-delivery-date';
import { CpqQuoteModule } from '@spartacus/cpq-quote';

const extensions: Type<any>[] = [];

if (environment.estimatedDeliveryDate) {
  extensions.push(EstimatedDeliveryDateModule);
}
if (environment.cpq) {
  extensions.push(CpqQuoteModule);
}
@NgModule({
  imports: [CartBaseModule, ...extensions],
})
export class CartBaseWrapperModule {}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Type } from '@angular/core';
import { OrderHistoryEnhancedUIModule } from '@spartacus/myaccount-enhanced-ui/order-history';
import { OrderModule } from '@spartacus/order';
import { environment } from '../../../../environments/environment';

const extensions: Type<any>[] = [];

if (environment.myAccountEnhancedUI) {
  extensions.push(OrderHistoryEnhancedUIModule);
}
@NgModule({
  imports: [OrderModule, ...extensions],
})
export class OrderWrapperModule {}

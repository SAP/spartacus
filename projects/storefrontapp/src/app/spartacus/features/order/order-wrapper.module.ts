/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Type } from '@angular/core';
import { OrderModule } from '@spartacus/order';
import { OrderEnhancedUIModule } from '@spartacus/myaccount-enhanced-ui/order';
import { environment } from '../../../../environments/environment';

const extensions: Type<any>[] = [];

if (environment.myAccountEnhancedUI) {
  extensions.push(OrderEnhancedUIModule);
}

@NgModule({
  imports: [OrderModule, ...extensions],
})
export class OrderWrapperModule {}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Type } from '@angular/core';
import { NewMyAccountOrderHistoryModule } from 'integration-libs/new-myaccount/order-history/public_api';
import { OrderModule } from '@spartacus/order';
import { environment } from '../../../../environments/environment';

const extensions: Type<any>[] = [];

if (environment.new_myAccount) {
  extensions.push(NewMyAccountOrderHistoryModule);
}
@NgModule({
  imports: [OrderModule, ...extensions],
})
export class OrderWrapperModule {}

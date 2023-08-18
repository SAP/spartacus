/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Type } from '@angular/core';
import { CdpOrderHistoryModule } from '@spartacus/cdp/order-history';
import { OrderModule } from '@spartacus/order';
import { environment } from '../../../../environments/environment';

const extensions: Type<any>[] = [];

if (environment.cdp) {
  extensions.push(CdpOrderHistoryModule);
}
@NgModule({
  imports: [OrderModule, ...extensions],
})
export class OrderWrapperModule {}

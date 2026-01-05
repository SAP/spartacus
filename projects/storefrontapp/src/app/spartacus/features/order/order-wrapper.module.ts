/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Type } from '@angular/core';
import { OmfOrderModule } from '@spartacus/omf/order';
import { OpfOrderModule } from '@spartacus/opf/order';
import { OrderModule } from '@spartacus/order';
import { S4ServiceOrderModule } from '@spartacus/s4-service/order';
import { environment } from '../../../../environments/environment';

const extensions: Type<any>[] = [];
if (environment.s4Service) {
  extensions.push(S4ServiceOrderModule);
}
if (environment.omf) {
  extensions.push(OmfOrderModule);
}
if (environment.opf) {
  extensions.push(OpfOrderModule);
}
@NgModule({
  imports: [OrderModule, ...extensions],
})
export class OrderWrapperModule {}

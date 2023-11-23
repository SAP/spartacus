/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { AbstractOrderDirective } from './abstract-order.directive';

@NgModule({
  declarations: [AbstractOrderDirective],

  exports: [AbstractOrderDirective],
})
export class AbstractOrderModule {}

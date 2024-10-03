/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { AbstractOrderContextDirective } from './abstract-order-context.directive';

@NgModule({
  declarations: [AbstractOrderContextDirective],
  exports: [AbstractOrderContextDirective],
})
export class AbstractOrderContextModule {}

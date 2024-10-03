/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItemActiveDirective } from './item-active.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ItemActiveDirective],
  exports: [ItemActiveDirective],
})
export class ItemActiveModule {}

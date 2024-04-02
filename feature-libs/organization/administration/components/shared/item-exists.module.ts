/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItemExistsDirective } from './item-exists.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ItemExistsDirective],
  exports: [ItemExistsDirective],
})
export class ItemExistsModule {}

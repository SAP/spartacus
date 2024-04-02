/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutletRefDirective } from './outlet-ref.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [OutletRefDirective],
  exports: [OutletRefDirective],
})
export class OutletRefModule {}

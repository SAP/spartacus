/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OutletRefDirective } from './outlet-ref.directive';

@NgModule({
  imports: [CommonModule, OutletRefDirective],
  exports: [OutletRefDirective],
})
export class OutletRefModule {}

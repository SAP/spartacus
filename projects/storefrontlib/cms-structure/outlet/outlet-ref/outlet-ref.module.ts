/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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

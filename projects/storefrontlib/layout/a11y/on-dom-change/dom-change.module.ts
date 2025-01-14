/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DomChangeDirective } from './dom-change.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [DomChangeDirective],
  exports: [DomChangeDirective],
})
export class DomChangeModule {}

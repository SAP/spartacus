/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DomChangeDirective } from './dom-change.directive';

@NgModule({
  imports: [CommonModule, DomChangeDirective],
  exports: [DomChangeDirective],
})
export class DomChangeModule {}

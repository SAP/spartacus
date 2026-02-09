/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AttributesDirective } from './attributes.directive';

@NgModule({
  imports: [CommonModule, AttributesDirective],
  exports: [AttributesDirective],
})
export class AttributesModule {}

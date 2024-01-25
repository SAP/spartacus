/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AttributesDirective } from './attributes.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [AttributesDirective],
  exports: [AttributesDirective],
})
export class AttributesModule {}

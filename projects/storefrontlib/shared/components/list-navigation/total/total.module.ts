/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { TotalComponent } from './total.component';

@NgModule({
  imports: [CommonModule, FormsModule, I18nModule],
  declarations: [TotalComponent],
  exports: [TotalComponent],
})
export class TotalModule {}

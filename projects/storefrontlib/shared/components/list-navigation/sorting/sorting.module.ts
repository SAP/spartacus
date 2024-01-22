/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule } from '@spartacus/core';
import { NgSelectA11yModule } from '../../ng-select-a11y/ng-select-a11y.module';
import { SortingComponent } from './sorting.component';

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    NgSelectA11yModule,
    I18nModule,
  ],
  declarations: [SortingComponent],
  exports: [SortingComponent],
})
export class SortingModule {}

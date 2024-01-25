/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';
import { PaginationComponent, PaginationModule } from './pagination/index';
import { SortingComponent } from './sorting/sorting.component';
import { SortingModule } from './sorting/sorting.module';
import { TotalModule } from './total';
import { TotalComponent } from './total/total.component';

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    IconModule,
    PaginationModule,
    SortingModule,
    TotalModule,
  ],
  exports: [SortingComponent, PaginationComponent, TotalComponent],
})
export class ListNavigationModule {}

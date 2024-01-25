/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule, SpinnerModule } from '@spartacus/storefront';
import { StoreModule } from '../../presentational/index';
import { StoreListComponent } from './store-list.component';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule, SpinnerModule, StoreModule],
  exports: [StoreListComponent],
  declarations: [StoreListComponent],
})
export class StoreListModule {}

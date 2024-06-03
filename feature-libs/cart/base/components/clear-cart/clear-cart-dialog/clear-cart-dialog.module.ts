/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import {
  IconModule,
  KeyboardFocusModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { ClearCartDialogComponent } from './clear-cart-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SpinnerModule,
    I18nModule,
    IconModule,
    KeyboardFocusModule,
  ],
  declarations: [ClearCartDialogComponent],
  exports: [ClearCartDialogComponent],
})
export class ClearCartDialogModule {}

/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeaturesConfigModule, I18nModule } from '@spartacus/core';
import {
  FormErrorsModule,
  FormRequiredAsterisksComponent,
  FormRequiredLegendComponent,
  IconModule,
  KeyboardFocusModule,
} from '@spartacus/storefront';
import { SavedCartFormDialogComponent } from './saved-cart-form-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorsModule,
    I18nModule,
    IconModule,
    KeyboardFocusModule,
    FeaturesConfigModule,
    FormRequiredAsterisksComponent,
    FormRequiredLegendComponent,
    SavedCartFormDialogComponent,
  ],
  exports: [SavedCartFormDialogComponent],
})
export class SavedCartFormDialogModule {}

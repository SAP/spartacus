/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { IconModule, KeyboardFocusModule } from '@spartacus/storefront';
import { defaultDpConfirmationDialogConfig } from './default-dp-confirmation-dialog.config';
import { DpConfirmationDialogComponent } from './dp-confirmation-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    KeyboardFocusModule,
    IconModule,
    FeaturesConfigModule,
  ],
  providers: [provideDefaultConfig(defaultDpConfirmationDialogConfig)],
  declarations: [DpConfirmationDialogComponent],
})
export class DpConfirmationDialogModule {}

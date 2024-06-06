/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { IconModule, KeyboardFocusModule } from '@spartacus/storefront';
import { DpConfirmationDialogComponent } from './dp-confirmation-dialog.component';
import { defaultDpConfirmationDialogConfig } from './default-dp-confirmation-dialog.config';

@NgModule({
  imports: [CommonModule, I18nModule, KeyboardFocusModule, IconModule],
  providers: [provideDefaultConfig(defaultDpConfirmationDialogConfig)],
  declarations: [DpConfirmationDialogComponent],
})
export class DpConfirmationDialogModule {}

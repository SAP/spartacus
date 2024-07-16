/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { IconModule, KeyboardFocusModule } from '@spartacus/storefront';
import { ExtendSessionDialogComponent } from './extend-session-dialog.component';
import { defaultExtendSessionLayoutConfig } from './default-extend-session-layout.config';
import { ExtendSessionDialogService } from './extend-session-dialog.service';

@NgModule({
  imports: [CommonModule, I18nModule, KeyboardFocusModule, IconModule],
  providers: [
    provideDefaultConfig(defaultExtendSessionLayoutConfig),
    ExtendSessionDialogService,
  ],
  declarations: [ExtendSessionDialogComponent],
  exports: [ExtendSessionDialogComponent],
})
export class ExtendSessionDialogModule {
  // intentional empty constructor
  constructor(_extendSessionDialogService: ExtendSessionDialogService) {}
}

/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { KeyboardFocusModule } from '../../../../layout/a11y/keyboard-focus';
import { defaultPaginationConfig } from './config/index';
import { PaginationComponent } from './pagination.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    FeaturesConfigModule,
    KeyboardFocusModule,
  ],
  providers: [provideDefaultConfig(defaultPaginationConfig)],
  declarations: [PaginationComponent],
  exports: [PaginationComponent],
})
export class PaginationModule {}

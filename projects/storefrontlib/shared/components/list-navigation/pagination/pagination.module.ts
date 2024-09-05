/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
import { defaultPaginationConfig } from './config/index';
import { PaginationComponent } from './pagination.component';

@NgModule({
    imports: [CommonModule, RouterModule, I18nModule, FeaturesConfigModule, PaginationComponent],
    providers: [provideDefaultConfig(defaultPaginationConfig)],
    exports: [PaginationComponent],
})
export class PaginationModule {}

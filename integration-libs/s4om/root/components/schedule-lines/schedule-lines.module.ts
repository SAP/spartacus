/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { ScheduleLinesComponent } from './schedule-lines.component';

@NgModule({
  imports: [CommonModule, UrlModule, I18nModule, IconModule],

  declarations: [ScheduleLinesComponent],
  exports: [ScheduleLinesComponent],
})
export class ScheduleLinesModule {}

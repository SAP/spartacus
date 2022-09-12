/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { I18nModule } from '@commerce-storefront-toolset/core';
import { ProgressButtonComponent } from './progress-button.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  declarations: [ProgressButtonComponent],
  exports: [ProgressButtonComponent],
})
export class ProgressButtonModule {}

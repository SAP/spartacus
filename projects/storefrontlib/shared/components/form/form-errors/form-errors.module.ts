/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorsComponent } from './form-errors.component';
import { I18nModule } from '@commerce-storefront-toolset/core';

@NgModule({
  imports: [CommonModule, I18nModule],
  declarations: [FormErrorsComponent],
  exports: [FormErrorsComponent],
})
export class FormErrorsModule {}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { QuoteHeaderSellerEditComponent } from './quote-header-seller-edit.component';
import { IconModule, DatePickerModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    FormsModule,
    ReactiveFormsModule,
    IconModule,
    DatePickerModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        QuoteSellerEditComponent: {
          component: QuoteHeaderSellerEditComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [QuoteHeaderSellerEditComponent],
  exports: [QuoteHeaderSellerEditComponent],
})
export class QuoteHeaderSellerEditModule {}

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
import { QuoteSellerEditComponent } from './quote-seller-edit.component';

@NgModule({
  imports: [CommonModule, I18nModule, FormsModule, ReactiveFormsModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        QuoteSellerEditComponent: {
          component: QuoteSellerEditComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [QuoteSellerEditComponent],
  exports: [QuoteSellerEditComponent],
})
export class QuoteSellerEditModule {}

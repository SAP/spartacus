/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  DatePickerModule,
  IconModule,
  ListNavigationModule,
  MediaModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { InvoicesListComponent } from './invoices-list/invoices-list.component';

@NgModule({
  imports: [
    CommonModule,
    DatePickerModule,
    I18nModule,
    ReactiveFormsModule,
    ListNavigationModule,
    UrlModule,
    IconModule,
    MediaModule,
    SpinnerModule,
  ],
  declarations: [InvoicesListComponent],
  exports: [InvoicesListComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AccountOrderDetailsPDFInvoicesComponent: {
          component: InvoicesListComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
})
export class PDFInvoicesComponentsModule {}

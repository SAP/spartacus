/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { inject, NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { PDFInvoicesComponentsModule } from '@spartacus/pdf-invoices/components';
import {
  IconModule,
  KeyboardFocusModule,
  PaginationModule,
  SortingModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { defaultMyAccountV2DownloadInvoicesLayoutConfig } from './default-my-account-v2-download-invoices-layout.config';
import { MyAccountV2DownloadInvoicesEventListener } from './my-account-v2-download-invoices-event.listener';
import { MyAccountV2DownloadInvoicesComponent } from './my-account-v2-download-invoices.component';

@NgModule({
  imports: [
    CommonModule,
    KeyboardFocusModule,
    IconModule,
    I18nModule,
    PaginationModule,
    SortingModule,
    SpinnerModule,
    PDFInvoicesComponentsModule,
  ],
  providers: [
    provideDefaultConfig(defaultMyAccountV2DownloadInvoicesLayoutConfig),
  ],
  exports: [MyAccountV2DownloadInvoicesComponent],
  declarations: [MyAccountV2DownloadInvoicesComponent],
})
export class MyAccountV2DownloadInvoicesModule {
  protected downloadInvoicesDialogEventListener = inject(
    MyAccountV2DownloadInvoicesEventListener
  );
}

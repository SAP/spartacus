/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  pdfInvoicesTranslationChunksConfig,
  pdfInvoicesTranslationsEn,
  pdfInvoicesTranslationsJa,
  pdfInvoicesTranslationsDe,
  pdfInvoicesTranslationsZh,
} from '@spartacus/pdf-invoices/assets';
import {
  PDFInvoicesRootModule,
  PDF_INVOICES_FEATURE,
} from '@spartacus/pdf-invoices/root';

@NgModule({
  imports: [PDFInvoicesRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [PDF_INVOICES_FEATURE]: {
          module: () =>
            import('@spartacus/pdf-invoices').then((m) => m.PDFInvoicesModule),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: {
          en: pdfInvoicesTranslationsEn,
          ja: pdfInvoicesTranslationsJa,
          de: pdfInvoicesTranslationsDe,
          zh: pdfInvoicesTranslationsZh,
        },
        chunks: pdfInvoicesTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class PDFInvoicesFeatureModule {}

/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import {
  importExportTranslationChunksConfig,
  importExportTranslationsEn,
  importExportTranslationsJa,
  importExportTranslationsDe,
  importExportTranslationsZh,
} from '@spartacus/cart/import-export/assets';
import {
  CART_IMPORT_EXPORT_FEATURE,
  ImportExportRootModule,
} from '@spartacus/cart/import-export/root';

@NgModule({
  imports: [ImportExportRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [CART_IMPORT_EXPORT_FEATURE]: {
          module: () =>
            import('@spartacus/cart/import-export').then(
              (m) => m.ImportExportModule
            ),
        },
      },
      i18n: {
        resources: {
          en: importExportTranslationsEn,
          ja: importExportTranslationsJa,
          de: importExportTranslationsDe,
          zh: importExportTranslationsZh,
        },
        chunks: importExportTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class CartImportExportFeatureModule {}

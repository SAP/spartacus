/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideConfig } from '@commerce-storefront-toolset/core';
import {
  importExportTranslationChunksConfig,
  importExportTranslations,
} from '@commerce-storefront-toolset/cart/import-export/assets';
import {
  CART_IMPORT_EXPORT_FEATURE,
  ImportExportRootModule,
} from '@commerce-storefront-toolset/cart/import-export/root';

@NgModule({
  imports: [ImportExportRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [CART_IMPORT_EXPORT_FEATURE]: {
          module: () =>
            import('@commerce-storefront-toolset/cart/import-export').then(
              (m) => m.ImportExportModule
            ),
        },
      },
      i18n: {
        resources: importExportTranslations,
        chunks: importExportTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class ImportExportFeatureModule {}

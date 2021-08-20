import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import {
  importExportTranslationChunksConfig,
  importExportTranslations,
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
        resources: importExportTranslations,
        chunks: importExportTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class ImportExportFeatureModule {}

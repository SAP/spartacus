import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import {
  importExportTranslationChunksConfig,
  importExportTranslations,
} from '@spartacus/cart/import-export/assets';
import { ImportExportRootModule } from '@spartacus/cart/import-export/root';

@NgModule({
  imports: [ImportExportRootModule],
  providers: [
    provideConfig({
      featureModules: {
        cartImportExport: {
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

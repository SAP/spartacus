import { NgModule } from '@angular/core';
import {
  importExportTranslationChunksConfig,
  importExportTranslationsEn,
} from '@spartacus/cart/import-export/assets';
import {
  CART_IMPORT_EXPORT_FEATURE,
  ImportExportRootModule,
} from '@spartacus/cart/import-export/root';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';

@NgModule({
  declarations: [],
  imports: [ImportExportRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [CART_IMPORT_EXPORT_FEATURE]: {
          module: () => import('@spartacus/cart/import-export').then((m) => m.ImportExportModule),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: { en: importExportTranslationsEn },
        chunks: importExportTranslationChunksConfig,
      },
    }),
  ],
})
export class CartImportExportFeatureModule {}

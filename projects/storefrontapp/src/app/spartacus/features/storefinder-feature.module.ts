import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  storeFinderTranslationChunksConfig,
  storeFinderTranslations,
} from '@spartacus/storefinder/assets';
import {
  StoreFinderRootModule,
  STORE_FINDER_FEATURE,
} from '@spartacus/storefinder/root';

@NgModule({
  imports: [StoreFinderRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [STORE_FINDER_FEATURE]: {
          module: () =>
            import('@spartacus/storefinder').then((m) => m.StoreFinderModule),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: storeFinderTranslations,
        chunks: storeFinderTranslationChunksConfig,
      },
    }),
  ],
})
export class StorefinderFeatureModule {}

import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  storeFinderTranslationChunksConfig,
  storeFinderTranslationsEn,
} from '@spartacus/storefinder/assets';
import { STORE_FINDER_FEATURE, StoreFinderRootModule } from '@spartacus/storefinder/root';

@NgModule({
  declarations: [],
  imports: [StoreFinderRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [STORE_FINDER_FEATURE]: {
          module: () => import('@spartacus/storefinder').then((m) => m.StoreFinderModule),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: { en: storeFinderTranslationsEn },
        chunks: storeFinderTranslationChunksConfig,
      },
    }),
  ],
})
export class StoreFinderFeatureModule {}

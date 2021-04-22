import { NgModule } from '@angular/core';
import { CmsConfig, provideConfig } from '@spartacus/core';
import {
  storeFinderTranslationChunksConfig,
  storeFinderTranslations,
} from '@spartacus/storefinder/assets';
import { StoreFinderRootModule } from '@spartacus/storefinder/root';

@NgModule({
  imports: [StoreFinderRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        storeFinder: {
          module: () =>
            import('@spartacus/storefinder').then((m) => m.StoreFinderModule),
        },
      },
      i18n: {
        resources: storeFinderTranslations,
        chunks: storeFinderTranslationChunksConfig,
      },
    }),
  ],
})
export class StorefinderFeatureModule {}

import { NgModule } from '@angular/core';
import {
  savedCartTranslationChunksConfig,
  savedCartTranslations,
} from '@spartacus/cart/saved-cart/assets';
import { SavedCartRootModule } from '@spartacus/cart/saved-cart/root';
import { CmsConfig, provideConfig } from '@spartacus/core';

@NgModule({
  imports: [SavedCartRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        cartSavedCart: {
          module: () =>
            import('@spartacus/cart/saved-cart').then((m) => m.SavedCartModule),
        },
      },
      i18n: {
        resources: savedCartTranslations,
        chunks: savedCartTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class SavedCartFeatureModule {}

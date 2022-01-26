import { NgModule } from '@angular/core';
import {
  cartBaseTranslationChunksConfig,
  cartBaseTranslations,
} from '@spartacus/cart/base/assets';
import { CartBaseRootModule, CART_BASE_FEATURE } from '@spartacus/cart/base/root';
import { I18nConfig, provideConfig } from '@spartacus/core';

@NgModule({
  imports: [CartBaseRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [CART_BASE_FEATURE]: {
          module: () =>
            import('@spartacus/cart/base').then((m) => m.CartBaseModule),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: cartBaseTranslations,
        chunks: cartBaseTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class CartBaseFeatureModule {}

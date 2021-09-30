import { NgModule } from '@angular/core';
import {
  addedToCartToastTranslationChunksConfig,
  addedToCartToastTranslations,
} from '@spartacus/cart/added-to-cart-toast/assets';
import {
  AddedToCartToastRootModule,
  ADDED_TO_CART_TOAST_FEATURE,
} from '@spartacus/cart/added-to-cart-toast/root';
import { provideConfig } from '@spartacus/core';

@NgModule({
  imports: [AddedToCartToastRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [ADDED_TO_CART_TOAST_FEATURE]: {
          module: () =>
            import('@spartacus/cart/added-to-cart-toast').then(
              (m) => m.AddedToCartToastModule
            ),
        },
      },
      i18n: {
        resources: addedToCartToastTranslations,
        chunks: addedToCartToastTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class AddedToCartToastFeatureModule {}

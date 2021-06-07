import { NgModule } from '@angular/core';
import {
  cartValidationTranslationChunksConfig,
  cartValidationTranslations,
} from '@spartacus/cart/validation/assets';
import {
  CART_VALIDATION_FEATURE,
  CartValidationRootModule,
} from '@spartacus/cart/validation/root';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';

@NgModule({
  imports: [CartValidationRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [CART_VALIDATION_FEATURE]: {
          module: () =>
            import('@spartacus/cart/validation').then((m) => m.CartValidationModule),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: cartValidationTranslations,
        chunks: cartValidationTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class CartValidationFeatureModule {}

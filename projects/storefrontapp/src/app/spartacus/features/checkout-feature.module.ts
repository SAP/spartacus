import { NgModule } from '@angular/core';
import { CART_FEATURE } from '@spartacus/cart/main/root';
import {
  checkoutTranslationChunksConfig,
  checkoutTranslations,
} from '@spartacus/checkout/assets';
import { CheckoutRootModule, CHECKOUT_FEATURE } from '@spartacus/checkout/root';
import { provideConfig } from '@spartacus/core';

@NgModule({
  imports: [CheckoutRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [CHECKOUT_FEATURE]: {
          module: () =>
            import('@spartacus/checkout').then((m) => m.CheckoutModule),
          dependencies: [CART_FEATURE],
        },
      },
      i18n: {
        resources: checkoutTranslations,
        chunks: checkoutTranslationChunksConfig,
      },
    }),
  ],
})
export class CheckoutFeatureModule {}

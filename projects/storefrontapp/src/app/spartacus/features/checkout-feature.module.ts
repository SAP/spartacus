import { NgModule } from '@angular/core';
import {
  checkoutTranslationChunksConfig,
  checkoutTranslations,
} from '@spartacus/checkout/base/assets';
import {
  CheckoutRootModule,
  CHECKOUT_FEATURE,
} from '@spartacus/checkout/base/root';
import { provideConfig } from '@spartacus/core';

@NgModule({
  imports: [CheckoutRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [CHECKOUT_FEATURE]: {
          module: () =>
            import('@spartacus/checkout/base').then((m) => m.CheckoutModule),
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

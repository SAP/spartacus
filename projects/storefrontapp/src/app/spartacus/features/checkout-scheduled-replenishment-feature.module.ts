import { NgModule } from '@angular/core';
import {
  checkoutB2BTranslationChunksConfig,
  checkoutB2BTranslations,
} from '@spartacus/checkout/b2b/assets';
import {
  checkoutTranslationChunksConfig,
  checkoutTranslations,
} from '@spartacus/checkout/base/assets';
import { CHECKOUT_FEATURE } from '@spartacus/checkout/base/root';
import {
  checkoutScheduledReplenishmentTranslationChunksConfig,
  checkoutScheduledReplenishmentTranslations,
} from '@spartacus/checkout/scheduled-replenishment/assets';
import { CheckoutScheduledReplenishmentRootModule } from '@spartacus/checkout/scheduled-replenishment/root';
import { provideConfig } from '@spartacus/core';

@NgModule({
  imports: [CheckoutScheduledReplenishmentRootModule],
  providers: [
    provideConfig({
      i18n: {
        resources: checkoutTranslations,
        chunks: checkoutTranslationChunksConfig,
      },
    }),
    provideConfig({
      i18n: {
        resources: checkoutB2BTranslations,
        chunks: checkoutB2BTranslationChunksConfig,
      },
    }),
    provideConfig({
      featureModules: {
        [CHECKOUT_FEATURE]: {
          module: () =>
            import('@spartacus/checkout/scheduled-replenishment').then(
              (m) => m.CheckoutScheduledReplenishmentModule
            ),
        },
      },
      i18n: {
        resources: checkoutScheduledReplenishmentTranslations,
        chunks: checkoutScheduledReplenishmentTranslationChunksConfig,
      },
    }),
  ],
})
export class CheckoutScheduledReplenishmentFeatureModule {}

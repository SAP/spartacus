import { NgModule } from '@angular/core';
import { checkoutB2BTranslations } from '@spartacus/checkout/b2b/assets';
import {
  checkoutTranslationChunksConfig,
  checkoutTranslations,
} from '@spartacus/checkout/base/assets';
import { checkoutScheduledReplenishmentTranslations } from '@spartacus/checkout/scheduled-replenishment/assets';
import {
  CheckoutScheduledReplenishmentRootModule,
  CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE,
} from '@spartacus/checkout/scheduled-replenishment/root';
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
        chunks: checkoutTranslationChunksConfig,
      },
    }),
    provideConfig({
      featureModules: {
        [CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE]: {
          module: () =>
            import('@spartacus/checkout/scheduled-replenishment').then(
              (m) => m.CheckoutScheduledReplenishmentModule
            ),
        },
      },
      i18n: {
        resources: checkoutScheduledReplenishmentTranslations,
        chunks: checkoutTranslationChunksConfig,
      },
    }),
  ],
})
export class CheckoutScheduledReplenishmentFeatureModule {}

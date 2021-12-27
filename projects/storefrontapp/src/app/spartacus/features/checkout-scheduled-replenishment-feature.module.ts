import { NgModule } from '@angular/core';
import { CHECKOUT_B2B_FEATURE } from '@spartacus/checkout/b2b/root';
import { checkoutTranslationChunksConfig } from '@spartacus/checkout/base/assets';
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
      featureModules: {
        [CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE]: {
          module: () =>
            import('@spartacus/checkout/scheduled-replenishment').then(
              (m) => m.CheckoutScheduledReplenishmentModule
            ),
          dependencies: [CHECKOUT_B2B_FEATURE],
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

import { NgModule } from '@angular/core';
import { checkoutTranslationChunksConfig } from '@spartacus/checkout/base/assets';
import { CHECKOUT_FEATURE } from '@spartacus/checkout/base/root';
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
          dependencies: [CHECKOUT_FEATURE],
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

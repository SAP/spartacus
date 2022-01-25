import { NgModule } from '@angular/core';
import {
  checkoutB2BTranslationChunksConfig,
  checkoutB2BTranslations,
} from '@spartacus/checkout/b2b/assets';
import {
  CheckoutB2BAuthGuard,
  CheckoutB2BStepsSetGuard,
} from '@spartacus/checkout/b2b/components';
import {
  checkoutTranslationChunksConfig,
  checkoutTranslations,
} from '@spartacus/checkout/base/assets';
import {
  CheckoutAuthGuard,
  CheckoutStepsSetGuard,
} from '@spartacus/checkout/base/components';
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
      i18n: {
        resources: checkoutScheduledReplenishmentTranslations,
        chunks: checkoutScheduledReplenishmentTranslationChunksConfig,
      },
    }),

    {
      provide: CheckoutAuthGuard,
      useExisting: CheckoutB2BAuthGuard,
    },
    {
      provide: CheckoutStepsSetGuard,
      useExisting: CheckoutB2BStepsSetGuard,
    },

    provideConfig({
      featureModules: {
        [CHECKOUT_FEATURE]: {
          module: () =>
            import(
              './checkout-scheduled-replenishment-feature-custom.module'
            ).then((m) => m.CheckoutScheduledReplenishmentFeatureCustomModule),
        },
      },
    }),
  ],
})
export class CheckoutScheduledReplenishmentFeatureModule {}

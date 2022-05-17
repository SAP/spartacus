import { NgModule } from '@angular/core';
import {
  pickupInStoreTranslationChunksConfig,
  pickupInStoreTranslations,
} from '@spartacus/pickup-in-store/assets';
import {
  CART_PICKUP_IN_STORE_FEATURE,
  PickupInStoreRootModule,
} from '@spartacus/pickup-in-store/root';
import { provideConfig } from '@spartacus/core';

@NgModule({
  imports: [PickupInStoreRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [CART_PICKUP_IN_STORE_FEATURE]: {
          module: () =>
            import('@spartacus/pickup-in-store').then(
              (m) => m.PickupInStoreModule
            ),
        },
      },
      i18n: {
        resources: pickupInStoreTranslations,
        chunks: pickupInStoreTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class PickupInStoreFeatureModule {}

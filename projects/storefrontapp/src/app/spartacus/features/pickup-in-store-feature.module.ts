import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
// import {
//   importExportTranslationChunksConfig,
//   importExportTranslations,
// } from '@spartacus/cart/import-export/assets';
import {
  CART_PICKUP_IN_STORE_FEATURE,
  PickupInStoreRootModule,
} from '@spartacus/cart/pickup-in-store/root';

@NgModule({
  imports: [PickupInStoreRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [CART_PICKUP_IN_STORE_FEATURE]: {
          module: () =>
            import('@spartacus/cart/pickup-in-store').then(
              (m) => m.PickupInStoreModule
            ),
        },
      },
      // i18n: {
      //   resources: importExportTranslations,
      //   chunks: importExportTranslationChunksConfig,
      //   fallbackLang: 'en',
      // },
    }),
  ],
})
export class PickupInStoreFeatureModule {}

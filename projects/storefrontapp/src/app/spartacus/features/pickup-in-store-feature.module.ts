import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { PickupInStoreModule } from '@spartacus/pickup-in-store';
import {
  pickupInStoreTranslationChunksConfig,
  pickupInStoreTranslations,
} from '@spartacus/pickup-in-store/assets';

@NgModule({
  imports: [PickupInStoreModule],
  providers: [
    provideConfig({
      i18n: {
        resources: pickupInStoreTranslations,
        chunks: pickupInStoreTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class PickupInStoreFeatureModule {}

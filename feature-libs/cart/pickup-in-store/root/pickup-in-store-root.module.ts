import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '@spartacus/core';
import {
  CART_PICKUP_IN_STORE_FEATURE,
  CART_PICKUP_IN_STORE_CORE_FEATURE,
} from './feature-name';

export function defaultPickupInStoreComponentsConfig() {
  const config = {
    featureModules: {
      [CART_PICKUP_IN_STORE_CORE_FEATURE]: CART_PICKUP_IN_STORE_FEATURE,
    },
  };
  return config;
}

@NgModule({
  providers: [
    provideDefaultConfigFactory(defaultPickupInStoreComponentsConfig),
  ],
})
export class PickupInStoreRootModule {}

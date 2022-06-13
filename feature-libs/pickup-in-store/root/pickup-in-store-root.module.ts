import { NgModule } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import {
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { PickupDeliveryOptionsComponent } from '@spartacus/pickup-in-store/components';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { defaultPickupOptionsDialogLayoutConfig } from './config/pickup-delivery-option-dialog-layout.config';
import {
  PICKUP_IN_STORE_CORE_FEATURE,
  PICKUP_IN_STORE_FEATURE,
} from './feature-name';

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultPickupInStoreComponentsConfig(): CmsConfig {
  return {
    featureModules: {
      [PICKUP_IN_STORE_CORE_FEATURE]: PICKUP_IN_STORE_FEATURE,
    },
  };
}

@NgModule({
  providers: [
    provideDefaultConfig(defaultPickupOptionsDialogLayoutConfig),
    provideDefaultConfigFactory(defaultPickupInStoreComponentsConfig),
    provideOutlet({
      id: CartOutlets.ADD_TO_CART_CONTAINER,
      position: OutletPosition.REPLACE,
      component: PickupDeliveryOptionsComponent,
    }),
  ],
})
export class PickupInStoreRootModule {}

import { NgModule } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { I18nModule } from '@spartacus/core';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { PickupDeliveryOptionsComponent } from './pickup-delivery-options.component';

@NgModule({
  imports: [I18nModule],
  providers: [
    provideOutlet({
      id: CartOutlets.ADD_TO_CART_CONTAINER,
      position: OutletPosition.REPLACE,
      component: PickupDeliveryOptionsComponent,
    }),
  ],
  declarations: [PickupDeliveryOptionsComponent],
  exports: [PickupDeliveryOptionsComponent],
})
export class PickupDeliveryOptionsModule {}

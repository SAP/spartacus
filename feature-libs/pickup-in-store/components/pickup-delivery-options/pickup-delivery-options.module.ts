import { NgModule } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { defaultPickupOptionsDialogLayoutConfig } from '../pickup-delivery-option-dialog';
import { PickupDeliveryOptionsComponent } from './pickup-delivery-options.component';

@NgModule({
  imports: [I18nModule],
  entryComponents: [PickupDeliveryOptionsComponent],
  declarations: [PickupDeliveryOptionsComponent],
  exports: [PickupDeliveryOptionsComponent],
  providers: [
    provideDefaultConfig(defaultPickupOptionsDialogLayoutConfig),
    provideOutlet({
      id: CartOutlets.ADD_TO_CART_CONTAINER,
      position: OutletPosition.REPLACE,
      component: PickupDeliveryOptionsComponent,
    }),
  ],
})
export class PickupDeliveryOptionsModule {}

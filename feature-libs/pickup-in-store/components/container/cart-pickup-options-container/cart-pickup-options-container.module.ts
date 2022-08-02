import { NgModule } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import {
  PickupOptionsComponent,
  PickupOptionsModule,
} from '../../presentational/index';

import { CartPickupOptionsContainerComponent } from './cart-pickup-options-container.component';

@NgModule({
  imports: [PickupOptionsModule],
  exports: [CartPickupOptionsContainerComponent],
  declarations: [CartPickupOptionsContainerComponent],
  providers: [
    provideOutlet({
      id: CartOutlets.ITEM_DELIVERY_DETAILS,
      position: OutletPosition.REPLACE,
      component: PickupOptionsComponent,
    }),
  ],
})
export class CartPickupOptionsContainerModule {}

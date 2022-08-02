import { NgModule } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { PickupOptionsModule } from '../../presentational/index';

import { PdpPickupOptionsContainerComponent } from './pdp-pickup-options-container.component';

@NgModule({
  imports: [PickupOptionsModule],
  exports: [PdpPickupOptionsContainerComponent],
  declarations: [PdpPickupOptionsContainerComponent],
  providers: [
    provideOutlet({
      id: CartOutlets.ADD_TO_CART_CONTAINER,
      position: OutletPosition.REPLACE,
      component: PdpPickupOptionsContainerComponent,
    }),
  ],
})
export class PdpPickupOptionsContainerModule {}

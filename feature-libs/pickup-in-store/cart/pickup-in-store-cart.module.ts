import { NgModule } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { PickupInStoreActiveCartService } from './facade/pickup-in-store-active-cart.service';

@NgModule({
  providers: [
    PickupInStoreActiveCartService,
    { provide: ActiveCartFacade, useExisting: PickupInStoreActiveCartService },
  ],
})
export class PickupInStoreCartModule {}

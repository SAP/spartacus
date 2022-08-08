import { NgModule, Type } from '@angular/core';
import { CartBaseModule } from '@spartacus/cart/base';
import { PickupInStoreCartModule } from '@spartacus/pickup-in-store/cart';
import { environment } from '../../../../environments/environment';

const extensions: Type<any>[] = [];

if (environment.pickupInStore) {
  extensions.push(PickupInStoreCartModule);
}

@NgModule({
  imports: [CartBaseModule, ...extensions],
})
export class CartBaseWrapperModule {}

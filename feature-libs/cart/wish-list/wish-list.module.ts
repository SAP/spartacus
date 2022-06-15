import { NgModule } from '@angular/core';
import { WishListComponentsModule } from '@spartacus/cart/wish-list/components';
import { WishListCoreModule } from '@spartacus/cart/wish-list/core';

@NgModule({
  imports: [WishListComponentsModule, WishListCoreModule],
})
export class WishListModule {}

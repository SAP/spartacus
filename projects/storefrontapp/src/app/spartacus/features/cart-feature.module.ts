import { NgModule } from '@angular/core';
import { CartModule } from '@spartacus/cart/main';
import { CartRootModule } from '@spartacus/cart/main/root';

@NgModule({
  imports: [CartRootModule, CartModule],
})
export class CartFeatureModule {}

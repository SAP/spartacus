import { NgModule } from '@angular/core';
import { CartCoreModule } from '@spartacus/cart/main/core';
import { CartOccModule } from '@spartacus/cart/main/occ';

@NgModule({
  //  imports: [CartCoreModule, CartOccModule, CartComponentsModule],
  imports: [CartCoreModule, CartOccModule],
})
export class CartModule {}

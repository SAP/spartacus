import { NgModule } from '@angular/core';
import { CartComponentsModule } from '@spartacus/cart/main/components';
import { CartCoreModule } from '@spartacus/cart/main/core';
import { CartOccModule } from '@spartacus/cart/main/occ';

@NgModule({
  imports: [CartCoreModule, CartOccModule, CartComponentsModule],
})
export class CartModule {}

import { NgModule } from '@angular/core';
import { CartComponentsModule } from '@spartacus/cart/base/components';
import { CartCoreModule } from '@spartacus/cart/base/core';
import { CartOccModule } from '@spartacus/cart/base/occ';

@NgModule({
  imports: [CartCoreModule, CartOccModule, CartComponentsModule],
})
export class CartModule {}

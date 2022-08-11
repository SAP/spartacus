import { NgModule } from '@angular/core';
import { CartBaseComponentsModule } from '@spartacus/cart/base/components';
import { CartBaseCoreModule } from '@spartacus/cart/base/core';
import { CartBaseOccModule } from '@spartacus/cart/base/occ';

@NgModule({
  imports: [CartBaseCoreModule, CartBaseOccModule, CartBaseComponentsModule],
})
export class CartBaseModule {}

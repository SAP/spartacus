import { NgModule } from '@angular/core';

import {
  CartDataService,
  CartService,
  SaveForLaterDataService,
  SaveForLaterService,
} from './facade/index';
import { CartOccModule } from './occ/cart-occ.module';
import { CartStoreModule } from './store/cart-store.module';
@NgModule({
  imports: [CartOccModule, CartStoreModule],
  providers: [
    CartDataService,
    CartService,
    SaveForLaterDataService,
    SaveForLaterService,
  ],
})
export class CartModule {}

import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartDataService, CartService } from './facade/index';
import { AuthModule } from './../auth/index';
import { CartOccModule } from './occ/cart-occ-module';
import { CartStoreModule } from './store/cart-store.module';
@NgModule({
  imports: [NgbModule, CartOccModule, AuthModule, CartStoreModule],
  providers: [CartDataService, CartService]
})
export class CartModule {}

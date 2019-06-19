import { NgModule } from '@angular/core';
import { CartDataService } from './facade/cart-data.service';
import { CartService } from './facade/index';
import { CartStoreModule } from './store/cart-store.module';

@NgModule({
  imports: [CartStoreModule],
  providers: [CartDataService, CartService],
})
export class CartModule {}

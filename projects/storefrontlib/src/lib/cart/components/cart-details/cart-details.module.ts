import { NgModule } from '@angular/core';
import { CartSharedModule } from '../cart-shared/cart-shared.module';
import { CartDetailsComponent } from './container/cart-details.component';
import { CartItemListComponent } from './cart-item-list/cart-item-list.component';

@NgModule({
  imports: [CartSharedModule],
  declarations: [CartDetailsComponent, CartItemListComponent],
  exports: [CartDetailsComponent, CartItemListComponent]
})
export class CartDetailsModule {}

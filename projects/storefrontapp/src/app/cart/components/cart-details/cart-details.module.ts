import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { CartDetailsComponent } from './container/cart-details.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { ItemCounterComponent } from './item-counter/item-counter.component';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  declarations: [
    CartDetailsComponent,
    OrderSummaryComponent,
    CartItemComponent,
    ItemCounterComponent
  ],
  exports: [
    CartDetailsComponent,
    OrderSummaryComponent,
    CartItemComponent,
    ItemCounterComponent
  ]
})
export class CartDetailsModule {}

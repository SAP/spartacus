import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { ItemCounterComponent } from './item-counter/item-counter.component';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  declarations: [
    OrderSummaryComponent,
    CartItemComponent,
    ItemCounterComponent
  ],
  exports: [
    OrderSummaryComponent,
    CartItemComponent,
    ItemCounterComponent,
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class CartSharedModule {}

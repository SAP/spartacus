import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { ComponentsModule } from './../../ui/components/components.module';
import { CartItemListComponent } from './cart-item-list/cart-item-list.component';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ComponentsModule],
  declarations: [
    CartItemComponent,
    OrderSummaryComponent,
    CartItemListComponent
  ],
  exports: [CartItemComponent, CartItemListComponent, OrderSummaryComponent]
})
export class CartSharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CartDetailsComponent } from './container/cart-details.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { CartItemComponent } from './cart-item/cart-item.component';

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule, FlexLayoutModule],
  declarations: [
    CartDetailsComponent,
    OrderSummaryComponent,
    CartItemComponent
  ],
  exports: [CartDetailsComponent, OrderSummaryComponent, CartItemComponent]
})
export class CartDetailsModule {}

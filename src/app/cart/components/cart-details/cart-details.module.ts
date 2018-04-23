import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CartDetailsComponent } from './container/cart-details.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule, FlexLayoutModule],
  declarations: [CartDetailsComponent, OrderSummaryComponent],
  exports: [CartDetailsComponent, OrderSummaryComponent]
})
export class CartDetailsModule {}

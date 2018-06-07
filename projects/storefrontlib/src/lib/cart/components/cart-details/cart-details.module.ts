import { OrderSummaryComponent } from './../cart-shared/order-summary/order-summary.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { CartDetailsComponent } from './container/cart-details.component';
import { CartSharedModule } from '../cart-shared/cart-shared.module';

@NgModule({
  imports: [CartSharedModule],
  declarations: [CartDetailsComponent],
  exports: [CartDetailsComponent]
})
export class CartDetailsModule {}

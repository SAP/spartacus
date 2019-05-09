import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlaceOrderComponent } from './place-order.component';
import { UrlModule, CheckoutModule, I18nModule } from '@spartacus/core';

@NgModule({
  imports: [CommonModule, CheckoutModule, RouterModule, UrlModule, I18nModule],
  declarations: [PlaceOrderComponent],
  exports: [PlaceOrderComponent],
})
export class PlaceOrderModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutModule } from '../../../checkout/checkout.module';
import { OrderConfirmationPageLayoutComponent } from './order-confirmation-page-layout.component';

@NgModule({
  imports: [CommonModule, CheckoutModule],
  declarations: [OrderConfirmationPageLayoutComponent],
  exports: [OrderConfirmationPageLayoutComponent]
})
export class OrderConfirmationPageLayoutModule {}

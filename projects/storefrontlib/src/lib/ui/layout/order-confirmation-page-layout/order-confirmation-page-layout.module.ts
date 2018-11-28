import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutModule } from '../../../checkout/checkout.module';
import { OrderConfirmationPageLayoutComponent } from './order-confirmation-page-layout.component';
import { OrderConfirmationModule } from '../../../checkout/components/order-confirmation/order-confirmation.module';

@NgModule({
  imports: [CommonModule, CheckoutModule, OrderConfirmationModule],
  declarations: [OrderConfirmationPageLayoutComponent],
  exports: [OrderConfirmationPageLayoutComponent]
})
export class OrderConfirmationPageLayoutModule {}

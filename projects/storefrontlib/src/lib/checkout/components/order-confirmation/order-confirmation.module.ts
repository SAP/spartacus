import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MediaModule } from './../../../ui/components/media/media.module';
import { CartSharedModule } from './../../../cart/components/cart-shared/cart-shared.module';
import { OrderConfirmationComponent } from './order-confirmation.component';

@NgModule({
  imports: [CommonModule, MediaModule, CartSharedModule],
  declarations: [OrderConfirmationComponent],
  exports: [OrderConfirmationComponent]
})
export class OrderConfirmationModule {}

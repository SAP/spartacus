import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderConfirmationComponent } from './order-confirmation.component';

@NgModule({
  imports: [CommonModule],
  declarations: [OrderConfirmationComponent],
  exports: [OrderConfirmationComponent]
})
export class OrderConfirmationModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from './order-details.component';
import { CartSharedModule } from '../../../cart/cart-shared/cart-shared.module';
import { CardModule } from '../../../ui/components/card/card.module';

@NgModule({
  imports: [CartSharedModule, CardModule, CommonModule],
  declarations: [OrderDetailsComponent],
  exports: [OrderDetailsComponent]
})
export class OrderDetailsModule {}

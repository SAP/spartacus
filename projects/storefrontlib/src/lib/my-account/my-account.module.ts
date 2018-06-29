import { NgModule } from '@angular/core';
import { OrderModule } from './order/order.module';

@NgModule({
  imports: [OrderModule],
  declarations: [],
  exports: [OrderModule]
})
export class MyAccountModule {}

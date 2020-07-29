import { NgModule } from '@angular/core';
import { CartEventModule } from './cart/cart-event.module';
import { PageEventModule } from './page/page-event.module';
import { ProductEventModule } from './product/product-event.module';

@NgModule({
  imports: [CartEventModule, PageEventModule, ProductEventModule],
})
export class EventsModule {}

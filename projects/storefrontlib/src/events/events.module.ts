import { NgModule } from '@angular/core';
import { CartEventModule } from './cart/cart-event.module';
import { PageEventModule } from './page/page-event.module';
import { ProductPageEventModule } from './product/product-page-event.module';

@NgModule({
  imports: [CartEventModule, PageEventModule, ProductPageEventModule],
})
export class EventsModule {}

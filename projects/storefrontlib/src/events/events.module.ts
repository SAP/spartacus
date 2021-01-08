import { NgModule } from '@angular/core';
import { CartPageEventModule } from './cart/cart-page-event.module';
import { PageEventCollectorModule } from './page';
import { PageEventModule } from './page/page-event.module';
import { ProductPageEventModule } from './product/product-page-event.module';

@NgModule({
  imports: [
    CartPageEventModule,
    PageEventModule,
    ProductPageEventModule,
    PageEventCollectorModule.forRoot(),
  ],
})
export class EventsModule {}

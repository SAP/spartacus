import { NgModule } from '@angular/core';
import { CartPageEventModule } from './cart/cart-page-event.module';
import { PageEventModule } from './page/page-event.module';
import { ProductPageEventModule } from './product/product-page-event.module';
import { SearchBoxEventModule } from './search-box/search-box-event.module';

@NgModule({
  imports: [
    CartPageEventModule,
    PageEventModule,
    ProductPageEventModule,
    SearchBoxEventModule,
  ],
})
export class EventsModule {}

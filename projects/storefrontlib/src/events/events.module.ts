import { NgModule } from '@angular/core';
import { CartPageEventModule } from './cart/cart-page-event.module';
import { NavigationEventModule } from './navigation/navigation-event.module';
import { PageEventModule } from './page/page-event.module';
import { ProductPageEventModule } from './product/product-page-event.module';

/**
 * @deprecated since 3.1, use individual imports instead
 */
@NgModule({
  imports: [
    NavigationEventModule,
    CartPageEventModule,
    PageEventModule,
    ProductPageEventModule,
  ],
})
export class EventsModule {}

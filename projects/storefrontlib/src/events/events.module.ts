import { NgModule } from '@angular/core';
import { CartEventModule } from './cart/cart-event.module';
import { PageEventModule } from './page/page-event.module';

@NgModule({
  imports: [CartEventModule, PageEventModule],
})
export class EventsModule {}

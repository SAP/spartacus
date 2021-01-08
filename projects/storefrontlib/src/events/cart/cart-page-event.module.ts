import { NgModule } from '@angular/core';
import { PageEventCollectorModule } from '../page/page-event-collector.module';
import { CartPageEventBuilder } from './cart-page-event.builder';

@NgModule({
  imports: [PageEventCollectorModule.forRoot()],
})
export class CartPageEventModule {
  constructor(_cartPageEventBuilder: CartPageEventBuilder) {}
}

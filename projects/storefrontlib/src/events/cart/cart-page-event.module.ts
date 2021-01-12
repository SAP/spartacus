import { NgModule } from '@angular/core';
import { CartPageEventCollectorModule } from './cart-page-event-collector.module';
import { CartPageEventBuilder } from './cart-page-event.builder';

@NgModule({ imports: [CartPageEventCollectorModule.forRoot()] })
export class CartPageEventModule {
  constructor(_cartPageEventBuilder: CartPageEventBuilder) {}
}

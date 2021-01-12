import { NgModule } from '@angular/core';
import { CheckoutEventCollectorModule } from './checkout-event-collector.module';
import { CheckoutEventBuilder } from './checkout-event.builder';

@NgModule({ imports: [CheckoutEventCollectorModule.forRoot()] })
export class CheckoutEventModule {
  constructor(_checkoutEventBuilder: CheckoutEventBuilder) {}
}

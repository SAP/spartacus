import { NgModule } from '@angular/core';
import { EVENT_BUILDER } from '../../event/event.token';
import { CartEventCollectorModule } from './cart-event-collector.module';
import { CartEventBuilder } from './cart-event.builder';

@NgModule({
  imports: [CartEventCollectorModule.forRoot()],
  // TODO: discuss
  providers: [
    { provide: EVENT_BUILDER, useExisting: CartEventBuilder, multi: true },
  ],
})
export class CartEventModule {
  // constructor(_CartEventBuilder: CartEventBuilder) {}
}

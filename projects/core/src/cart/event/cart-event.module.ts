import { NgModule } from '@angular/core';
import { CartEventBuilder } from './cart-event.builder';

/**
 * @deprecated since 4.1 - use cart lib instead
 */
@NgModule({})
export class CartEventModule {
  constructor(_CartEventBuilder: CartEventBuilder) {}
}

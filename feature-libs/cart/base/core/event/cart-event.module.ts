import { NgModule } from '@angular/core';
import { CartEventBuilder } from './cart-event.builder';
import { MultiCartEventListener } from './multi-cart-event.listener';

@NgModule({})
export class CartEventModule {
  constructor(
    _cartEventBuilder: CartEventBuilder,
    _multiCartEventListenere: MultiCartEventListener
  ) {}
}

import { NgModule } from '@angular/core';
import { ActiveCartEventBuilder } from './active-cart/active-cart-event.builder';
import { MultiCartEventBuilder } from './multi-cart/multi-cart-event.builder';

@NgModule({})
export class CartEventModule {
  constructor(
    _multiCartEventBuilder: MultiCartEventBuilder,
    _activeCartEventBuilder: ActiveCartEventBuilder
  ) {}
}

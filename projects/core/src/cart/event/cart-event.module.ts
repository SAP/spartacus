import { NgModule } from '@angular/core';
import { ActiveCartEventBuilder } from './active-cart-event.builder';
import { MultiCartEventBuilder } from './multi-cart-event.builder';

@NgModule({})
export class CartEventModule {
  constructor(_multi: MultiCartEventBuilder, _active: ActiveCartEventBuilder) {}
}

import { NgModule } from '@angular/core';
import { MultiCartEventListener } from './multi-cart-event.listener';

@NgModule({})
export class CartBaseEventModule {
  constructor(_multiCartEventListener: MultiCartEventListener) {
    // Intentional empty constructor
  }
}

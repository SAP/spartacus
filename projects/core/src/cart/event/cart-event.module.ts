import { NgModule } from '@angular/core';
import { CartEventService } from './cart-event.service';

@NgModule({})
export class CartEventModule {
  // simply add the CartEventService to the module constructor so
  // it gets initialized when added
  constructor(_cartEventService: CartEventService) {}
}

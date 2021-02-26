import { NgModule } from '@angular/core';
import { ProductEventBuilder } from './product-event.builder';

@NgModule({})
export class ProductEventModule {
  constructor(_productEventBuilder: ProductEventBuilder) {}
}

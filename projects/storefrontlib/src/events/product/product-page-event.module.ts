import { NgModule } from '@angular/core';
import { ProductPageEventCollectorModule } from './product-page-event-collector.module';
import { ProductPageEventBuilder } from './product-page-event.builder';

@NgModule({ imports: [ProductPageEventCollectorModule.forRoot()] })
export class ProductPageEventModule {
  constructor(_productPageEventBuilder: ProductPageEventBuilder) {}
}

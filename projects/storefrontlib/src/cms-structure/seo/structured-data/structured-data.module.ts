import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JsonLdComponent } from './json-ld.component';
import {
  ProductJsonLdBuilder,
  ProductOfferJsonLdBuilder,
  ProductReviewJsonLdBuilder,
} from './product/index';
import { SchemaComponent } from './schema.component';
import { JSONLD_PRODUCT_BUILDER } from './tokens';

@NgModule({
  imports: [CommonModule],
  declarations: [SchemaComponent, JsonLdComponent],
  exports: [SchemaComponent, JsonLdComponent],
  providers: [
    {
      provide: JSONLD_PRODUCT_BUILDER,
      useExisting: ProductJsonLdBuilder,
      multi: true,
    },
    {
      provide: JSONLD_PRODUCT_BUILDER,
      useExisting: ProductOfferJsonLdBuilder,
      multi: true,
    },
    {
      provide: JSONLD_PRODUCT_BUILDER,
      useExisting: ProductReviewJsonLdBuilder,
      multi: true,
    },
  ],
})
export class StructuredDataModule {}

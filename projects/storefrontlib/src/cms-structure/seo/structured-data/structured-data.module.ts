import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BreadcrumbSchemaBuilder } from './builders/breadcrumb/breadcrumb-schema.service';
import {
  JsonLdBaseProductBuilder,
  JsonLdProductOfferBuilder,
  JsonLdProductReviewBuilder,
  ProductSchemaBuilder,
} from './builders/product/index';
import { JSONLD_PRODUCT_BUILDER, SCHEMA_BUILDER } from './builders/tokens';
import { JsonLdComponent } from './components/json-ld.component';
import { SchemaComponent } from './components/schema.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SchemaComponent, JsonLdComponent],
  exports: [SchemaComponent, JsonLdComponent],
  providers: [
    {
      provide: SCHEMA_BUILDER,
      useExisting: ProductSchemaBuilder,
      multi: true,
    },
    {
      provide: SCHEMA_BUILDER,
      useExisting: BreadcrumbSchemaBuilder,
      multi: true,
    },
    // lower level jsonld builder classes offering fine-graiend control
    // for product related schema's
    {
      provide: JSONLD_PRODUCT_BUILDER,
      useExisting: JsonLdBaseProductBuilder,
      multi: true,
    },
    {
      provide: JSONLD_PRODUCT_BUILDER,
      useExisting: JsonLdProductOfferBuilder,
      multi: true,
    },
    {
      provide: JSONLD_PRODUCT_BUILDER,
      useExisting: JsonLdProductReviewBuilder,
      multi: true,
    },
  ],
})
export class StructuredDataModule {}

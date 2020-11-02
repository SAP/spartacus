import { NgModule } from '@angular/core';
import { BreadcrumbSchemaBuilder } from './breadcrumb/index';
import {
  JsonLdBaseProductBuilder,
  JsonLdProductOfferBuilder,
  JsonLdProductReviewBuilder,
  ProductSchemaBuilder,
} from './product/index';
import { JSONLD_PRODUCT_BUILDER, SCHEMA_BUILDER } from './tokens';

/**
 * Provides several standard json-ld builders that contribute
 * to collecting and building json-ld data.
 */
@NgModule({
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
    // lower level json-ld builder classes offering fine-grained control
    // for product related schemas
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
export class JsonLdBuilderModule {}

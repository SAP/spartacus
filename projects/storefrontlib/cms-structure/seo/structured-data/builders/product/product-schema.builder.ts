import { Inject, Injectable, Optional } from '@angular/core';
import { Product } from '@spartacus/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CurrentProductService } from '../../../../../cms-components/product/current-product.service';
import { JsonLdBuilder, SchemaBuilder } from '../schema.interface';
import { JSONLD_PRODUCT_BUILDER } from '../tokens';

/**
 * Adds the minimal structured data for the product, see https://schema.org/product.
 * The actual data collection is delegated to `JsonLdBuilder`s, which can be injected
 * using the `JSONLD_PRODUCT_BUILDER` token.
 */
@Injectable({
  providedIn: 'root',
})
export class ProductSchemaBuilder implements SchemaBuilder {
  constructor(
    private currentProduct: CurrentProductService,
    @Optional()
    @Inject(JSONLD_PRODUCT_BUILDER)
    protected builders: JsonLdBuilder<Product>[]
  ) {}

  build(): Observable<any> {
    return this.currentProduct.getProduct().pipe(
      switchMap((product: Product) => {
        if (product) {
          return combineLatest(this.collect(product)).pipe(
            map((res: {}[]) => Object.assign({}, ...res))
          );
        }
        return of({});
      })
    );
  }

  protected collect(product: Product): Observable<any>[] {
    if (!product || !product.code) {
      return [];
    }
    const builders = this.builders
      ? this.builders.map((builder) => builder.build(product))
      : [];
    return [
      of({
        '@context': 'http://schema.org',
        '@type': 'Product',
      }),
      ...builders,
    ];
  }
}

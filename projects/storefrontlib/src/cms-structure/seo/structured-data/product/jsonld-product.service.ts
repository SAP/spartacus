import { Inject, Injectable, Optional } from '@angular/core';
import { Product } from '@spartacus/core';
import { combineLatest, Observable, of } from 'rxjs';
import { flatMap, map, startWith } from 'rxjs/operators';
import { CurrentProductService } from '../../../../cms-components/product/current-product.service';
import { JsonLdBuilder } from '../schema.interface';
import { JSONLD_PRODUCT_BUILDER } from '../tokens';

/**
 * Adds the minimal structured data for the product, see https://schema.org/product.
 * The actual data creation is delegated to builders, which can be injected with
 * the `JSONLD_PRODUCT_BUILDER` token.
 */
@Injectable({
  providedIn: 'root',
})
export class JsonldProductService {
  constructor(
    private currentProduct: CurrentProductService,
    @Optional()
    @Inject(JSONLD_PRODUCT_BUILDER)
    protected builders: JsonLdBuilder<Product>[]
  ) {}

  getSchema(): Observable<any> {
    return this.currentProduct.getProduct().pipe(
      // we only need to emit the first valid product
      startWith({}),
      flatMap((product: Product) => combineLatest(this.build(product))),
      map((res: {}[]) => {
        const result = {};
        res.forEach(r => Object.assign(result, r));
        return result;
      })
    );
  }

  protected build(product: Product): Observable<any>[] {
    if (!product || !product.code) {
      return [of({})];
    }
    const builders = this.builders
      ? this.builders.map(builder => builder.build(product))
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

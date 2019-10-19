import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../model/product.model';
import { ProductAdapter } from './product.adapter';
import { ProductWithScope } from './product-with-scope';

@Injectable({
  providedIn: 'root',
})
export class ProductConnector {
  constructor(protected adapter: ProductAdapter) {}

  get(productCode: string, scope = ''): Observable<Product> {
    return this.adapter.load(productCode, scope);
  }

  getMany(products: ProductWithScope[]): ProductWithScope[] {
    if (!this.adapter.loadMany) {
      return products.map(product => ({
        ...product,
        data$: this.adapter.load(product.code, product.scope),
      }));
    }

    return this.adapter.loadMany(products);
  }
}

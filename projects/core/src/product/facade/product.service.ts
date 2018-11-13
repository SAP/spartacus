import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { map, tap, filter, take } from 'rxjs/operators';
import {
  ProductsState,
  getSelectedProductFactory,
  LoadProduct
} from '@spartacus/core';

@Injectable()
export class ProductService {
  constructor(private store: Store<ProductsState>) {}

  get(productCode: string): Observable<any> {
    return this.store.pipe(select(getSelectedProductFactory(productCode)));
  }

  isProductLoaded(requestedProductCode: string): Observable<boolean> {
    let tryTimes = 0;
    return this.store.pipe(
      select(getSelectedProductFactory(requestedProductCode)),
      map(product => {
        if (product) {
          return Object.keys(product).length !== 0;
        } else {
          return false;
        }
      }),
      tap(found => {
        if (!found) {
          tryTimes++;
          this.store.dispatch(new LoadProduct(requestedProductCode));
        }
      }),
      filter(found => found || tryTimes === 3),
      take(1)
    );
  }
}

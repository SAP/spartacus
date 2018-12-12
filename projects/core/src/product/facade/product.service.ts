import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../store/index';
import { Product } from '../../occ-models';
import { tap } from 'rxjs/operators';

@Injectable()
export class ProductService {
  constructor(private store: Store<fromStore.ProductsState>) {}

  /**
   * Returns the product observable. The product will be loaded
   * whenever there's no value observed.
   *
   * The underlying product loader ensures that the product is
   * only loaded once, even in case of parallel observers.
   */
  get(productCode: string): Observable<Product> {
    return this.store.pipe(
      select(fromStore.getSelectedProductFactory(productCode)),
      tap(product => {
        if (!product) {
          this.store.dispatch(new fromStore.LoadProduct(productCode));
        }
      })
    );
  }

  /**
   * Reloads the product. The product is loaded implicetly
   * whenever selected by the `get`, but in some cases an
   * explicit reload might be needed.
   */
  reload(productCode: string) {
    this.store.dispatch(new fromStore.LoadProduct(productCode, true));
  }
}

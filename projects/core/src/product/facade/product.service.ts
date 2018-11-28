import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../store/index';
import { Product } from '../../occ-models';

@Injectable()
export class ProductService {
  constructor(private store: Store<fromStore.ProductsState>) {}

  /**
   * Returns the product observable. The product is loaded
   * under the hood on first request.
   */
  get(productCode: string): Observable<Product> {
    this.store.dispatch(new fromStore.LoadProduct(productCode));
    return this.store.pipe(
      select(fromStore.getSelectedProductFactory(productCode))
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

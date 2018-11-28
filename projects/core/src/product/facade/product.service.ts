import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../store/index';

@Injectable()
export class ProductService {
  protected products = {};

  constructor(private store: Store<fromStore.ProductsState>) {}

  /**
   * Returns the product observable. If the product hasn't selected
   * before it will load the product as well.
   */
  get(productCode: string): Observable<any> {
    this.store.dispatch(new fromStore.LoadProduct(productCode));
    if (!this.products[productCode]) {
      this.products[productCode] = this.store.pipe(
        select(fromStore.getSelectedProductFactory(productCode))
      );
    }
    return this.products[productCode];
  }

  /**
   * (re)loads the product. The product is loaded implicetly
   * whenever selected by the `get`, but in some cases an
   * explicit reload might be needed.
   */
  reload(productCode: string) {
    this.store.dispatch(new fromStore.LoadProduct(productCode, true));
  }

  /**
   * Loads the product. This is implicetly done whenever
   * the product is selected.
   */
  protected load(productCode: string) {
    this.store.dispatch(new fromStore.LoadProduct(productCode));
  }
}

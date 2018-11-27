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
    if (!this.isSelected(productCode)) {
      this.products[productCode] = this.store.pipe(
        select(fromStore.getSelectedProductFactory(productCode))
      );
      this.load(productCode);
    }
    return this.products[productCode];
  }

  /**
   * Loads the product. This is implicetly done whenever
   * the product is selected.
   */
  protected load(productCode: string) {
    this.store.dispatch(new fromStore.LoadProduct(productCode));
  }

  /**
   * Determines whether the product has been selected before.
   * This is used as an internal mechanism to ensure we're
   * able to return a singleton observable as well as avoid
   * reloading the product over and over again.
   */
  protected isSelected(productCode: string): boolean {
    return this.products.hasOwnProperty(productCode);
  }
}

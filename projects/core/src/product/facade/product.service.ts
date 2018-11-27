import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../store/index';

@Injectable()
export class ProductService {
  protected products = {};

  constructor(private store: Store<fromStore.ProductsState>) {}

  get(productCode: string): Observable<any> {
    if (!this.isSelected(productCode)) {
      this.products[productCode] = this.store.pipe(
        select(fromStore.getSelectedProductFactory(productCode))
      );
      this.load(productCode);
    }
    return this.products[productCode];
  }

  protected load(productCode: string) {
    this.store.dispatch(new fromStore.LoadProduct(productCode));
  }

  protected isSelected(productCode: string): boolean {
    return this.products.hasOwnProperty(productCode);
  }
}

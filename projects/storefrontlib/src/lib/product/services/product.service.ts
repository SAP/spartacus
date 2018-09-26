import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../store';

@Injectable()
export class ProductService {
  constructor(private store: Store<fromStore.ProductsState>) {}

  get(productCode: string): Observable<any> {
    return this.store.select(fromStore.getSelectedProductFactory(productCode));
  }
}

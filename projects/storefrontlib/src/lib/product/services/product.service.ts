import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../store';

@Injectable()
export class ProductService {
  constructor(private store: Store<fromStore.ProductsState>) {}

  get(productCode: string): Observable<any> {
    return this.store.pipe(
      select(fromStore.getSelectedProductFactory(productCode))
    );
  }
}

import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../store/index';
import { Product } from '../../occ-models/occ.models';
import { map, tap } from 'rxjs/operators';
import { ProductEntity } from '../store/index';
// import { ProductEntity } from '../store/index';

@Injectable()
export class ProductService {
  constructor(private store: Store<fromStore.StateWithProduct>) {}

  /**
   * Returns the product observable. The product will be loaded
   * whenever there's no value observed.
   *
   * The underlying product loader ensures that the product is
   * only loaded once, even in case of parallel observers.
   */
  get(productCode: string): Observable<Product> {
    return this.getState(productCode).pipe(
      map(productState => productState.value)
    );
  }

  isLoading(productCode: string): Observable<boolean> {
    return this.getState(productCode).pipe(
      map(productState => productState.loading)
    );
  }

  // notAvailable(productCode: string): Observable<boolean> {
  //   return this.getState(productCode).pipe(
  //     map(productState => productState.notAvailable)
  //   );
  // }

  protected getState(productCode: string): Observable<ProductEntity> {
    return this.store.pipe(
      select(fromStore.getSelectedProductStateFactory(productCode)),
      tap(productState => {
        if (!productState.loading && !productState.value) {
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
    this.store.dispatch(new fromStore.LoadProduct(productCode));
  }
}

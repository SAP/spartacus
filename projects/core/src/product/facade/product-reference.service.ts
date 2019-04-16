import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductReference } from '../../occ/occ-models/occ.models';
import * as fromStore from '../store/index';

@Injectable()
export class ProductReferenceService {
  constructor(private store: Store<fromStore.StateWithProduct>) {}

  getByProductCode(productCode: string): Observable<ProductReference[]> {
    const selector = fromStore.getSelectedProductReferencesFactory(productCode);
    return this.store.pipe(
      select(selector),
      tap(reviews => {
        if (reviews === undefined && productCode !== undefined) {
          this.store.dispatch(new fromStore.LoadProductReferences(productCode));
        }
      })
    );
  }

  add(productCode: string, review: ProductReference): void {
    this.store.dispatch(
      new fromStore.PostProductReference({
        productCode: productCode,
        review,
      })
    );
  }
}

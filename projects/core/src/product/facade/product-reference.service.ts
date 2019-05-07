import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { UIProductReference } from '../model/product-reference-list';
// import { ProductReference } from '../../occ/occ-models/occ.models';
import * as fromStore from '../store/index';

@Injectable()
export class ProductReferenceService {
  constructor(private store: Store<fromStore.StateWithProduct>) {}

  get(
    productCode: string,
    referenceType?: string,
    pageSize?: number
  ): Observable<UIProductReference[]> {
    return this.store.pipe(
      select(fromStore.getSelectedProductReferencesFactory(productCode)),
      tap(references => {
        if (references === undefined && productCode !== undefined) {
          this.store.dispatch(
            new fromStore.LoadProductReferences({
              productCode,
              referenceType,
              pageSize,
            })
          );
        }
      }),
      filter(references => !!references)
    );
  }
}

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductReference } from '../../model/product.model';
import * as fromStore from '../store/index';

@Injectable()
export class ProductReferenceService {
  constructor(private store: Store<fromStore.StateWithProduct>) {}

  get(
    productCode: string,
    referenceType?: string,
    pageSize?: number
  ): Observable<ProductReference[]> {
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
      })
    );
  }
}

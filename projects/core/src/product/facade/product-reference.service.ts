import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { ProductReference } from '../../model/product.model';
import { ProductActions } from '../store/actions/index';
import { StateWithProduct } from '../store/product-state';
import { ProductSelectors } from '../store/selectors/index';

@Injectable({
  providedIn: 'root',
})
export class ProductReferenceService {
  constructor(protected store: Store<StateWithProduct>) {}

  get(
    productCode: string,
    referenceType?: string,
    pageSize?: number
  ): Observable<ProductReference[]> {
    return this.store.pipe(
      select(
        ProductSelectors.getSelectedProductReferencesFactory(
          productCode,
          referenceType
        )
      ),
      debounceTime(0),
      tap((references) => {
        if (references === undefined && productCode !== undefined) {
          this.store.dispatch(
            new ProductActions.LoadProductReferences({
              productCode,
              referenceType,
              pageSize,
            })
          );
        }
      })
    );
  }

  cleanReferences(): void {
    this.store.dispatch(new ProductActions.CleanProductReferences());
  }
}

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductReference } from '../../model/product.model';
import { ProductSelectors } from '../store';
import { ProductActions } from '../store/actions/index';
import { StateWithProduct } from '../store/product-state';

@Injectable({
  providedIn: 'root',
})
export class ProductReferenceService {
  constructor(protected store: Store<StateWithProduct>) {}

  loadProductReferences(
    productCode: string,
    referenceType?: string,
    pageSize?: number
  ): void {
    this.store.dispatch(
      new ProductActions.LoadProductReferences({
        productCode,
        referenceType,
        pageSize,
      })
    );
  }

  getProductReferences(
    productCode: string,
    referenceType: string
  ): Observable<ProductReference[]> {
    return this.store.pipe(
      select(
        ProductSelectors.getSelectedProductReferencesFactory(
          productCode,
          referenceType
        )
      )
    );
  }

  cleanReferences(): void {
    this.store.dispatch(new ProductActions.CleanProductReferences());
  }
}

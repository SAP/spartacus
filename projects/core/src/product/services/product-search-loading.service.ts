/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../model/product.model';
import { LoaderState } from '../../state/utils/loader';
import { StateWithProduct } from '../store';
import { ProductActions } from '../store/actions/index';
import { ProductSelectors } from '../store/selectors/index';
import { ScopedItemLoadingService } from './scoped-item-loading.service';

@Injectable({
  providedIn: 'root',
})
export class ProductSearchLoadingService extends ScopedItemLoadingService<
  Product,
  StateWithProduct
> {
  getItemName(): string {
    return 'productSearch';
  }
  getItemState(code: string, scope: string): Observable<LoaderState<Product>> {
    return this.store.pipe(
      select(
        ProductSelectors.getSelectedProductSearchByCodeStateFactory({
          code,
          scope,
        })
      )
    );
  }
  dispatchLoadAction(code: string, scope: string): void {
    this.store.dispatch(
      new ProductActions.SearchProductByCode({ code, scope })
    );
  }
  getLoadActionType(): string {
    return ProductActions.SEARCH_PRODUCT_BY_CODE;
  }
  getLoadSuccessActionType(): string {
    return ProductActions.SEARCH_PRODUCT_BY_CODE_SUCCESS;
  }
  getLoadFailActionType(): string {
    return ProductActions.SEARCH_PRODUCT_BY_CODE_FAIL;
  }
}

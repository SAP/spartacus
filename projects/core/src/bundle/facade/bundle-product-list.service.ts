/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductSearchPage } from '../../model/product-search.model';
import { BundleActions } from '../store/actions/index';


@Injectable({
  providedIn: 'root',
})
export class ProductSearchService {
  constructor(protected store: Store<any>) {}

  search(cartId: string, userId: string, entryGroupNumber: int): void {
    if (cartId && userId && entryGroupNumber) {
      this.store.dispatch(
        new BundleActions.GetBundleProducts(
            cartId,
            userId,
            entryGroupNumber
        )
      );
    }
  }

  getResults(): Observable<ProductSearchPage> {
    return this.store.pipe(select(ProductSelectors.getSearchResults));
  }
}

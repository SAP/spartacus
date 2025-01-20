/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, using } from 'rxjs';
import { auditTime, map, tap } from 'rxjs/operators';
import { Product } from '../../model';
import { StateWithProduct } from '../store/product-state';
import { ProductActions, ProductSelectors } from '../store';

@Injectable({
  providedIn: 'root',
})
export class ProductSearchByCategoryService {
  protected store = inject(Store<StateWithProduct>);

  load({
    categoryCode,
    scope,
  }: {
    categoryCode: string;
    scope?: string;
  }): void {
    this.store.dispatch(
      new ProductActions.ProductSearchLoadByCategory({
        categoryCode,
        scope: scope ?? '',
      })
    );
  }

  get({
    categoryCode,
    scope,
  }: {
    categoryCode: string;
    scope?: string;
  }): Observable<Product[] | undefined> {
    const state$ = this.store.pipe(
      select(
        ProductSelectors.getSelectedProductSearchByCategoryStateFactory({
          categoryCode,
          scope: scope ?? '',
        })
      )
    );

    const loading$ = state$.pipe(
      auditTime(0),
      tap((state) => {
        if (!(state.loading || state.success || state.error)) {
          this.load({ categoryCode, scope });
        }
      })
    );

    const value$ = state$.pipe(map((state) => state.value));

    return using(
      () => loading$.subscribe(),
      () => value$
    );
  }
}

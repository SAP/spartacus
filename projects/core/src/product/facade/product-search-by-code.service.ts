/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { auditTime, map, Observable, tap, using } from 'rxjs';
import { Product } from '../../model';
import { ProductActions } from '../store/actions/index';
import { StateWithProduct } from '../store/product-state';
import { ProductSelectors } from '../store/selectors/index';

@Injectable({
  providedIn: 'root',
})
export class ProductSearchByCodeService {
  protected store = inject(Store<StateWithProduct>);

  load({ code, scope }: { code: string; scope?: string }): void {
    this.store.dispatch(
      new ProductActions.ProductSearchLoadByCode({
        code,
        scope: scope ?? '',
      })
    );
  }

  get({
    code,
    scope,
  }: {
    code: string;
    scope?: string;
  }): Observable<Product | undefined> {
    const state$ = this.store.pipe(
      select(
        ProductSelectors.getSelectedProductSearchByCodeStateFactory({
          code,
          scope: scope ?? '',
        })
      )
    );

    const loading$ = state$.pipe(
      auditTime(0),
      tap((state) => {
        if (!(state.loading || state.success || state.error)) {
          this.load({ code, scope });
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

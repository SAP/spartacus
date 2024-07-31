/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { normalizeHttpError } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { LoggerService } from '../../../logger/logger.service';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { withdrawOn } from '../../../util/rxjs/withdraw-on';
import { ProductSearchConnector } from '../../connectors/search/product-search.connector';
import { ProductActions } from '../actions/index';

@Injectable()
export class ProductSearchByCodesEffects {
  protected logger = inject(LoggerService);
  private actions$ = inject(Actions);
  private productSearchConnector = inject(ProductSearchConnector);

  // we want to cancel all ongoing requests when currency or language changes,
  private contextChange$: Observable<Action> = this.actions$.pipe(
    ofType(
      SiteContextActions.CURRENCY_CHANGE,
      SiteContextActions.LANGUAGE_CHANGE
    )
  );

  searchByCodes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.SEARCH_PRODUCTS_BY_CODES),
      map((action: ProductActions.SearchProductsByCodes) => action.payload),
      mergeMap((payload) => {
        const filters = `code:${payload.codes}`;
        return this.productSearchConnector
          .search(
            '', // SPIKE we don't want to search by any phrase
            { filters },
            payload.scope
          )
          .pipe(
            map(
              (searchResults) =>
                new ProductActions.SearchProductsByCodesSuccess({
                  ...payload,
                  products: searchResults.products ?? [],
                })
            ),
            catchError((error) =>
              of(
                new ProductActions.SearchProductsByCodesFail({
                  ...payload,
                  error: normalizeHttpError(error, this.logger),
                })
              )
            )
          );
      }),
      withdrawOn(this.contextChange$)
    )
  );

  // SPIKE TODO SHOULD WE IMPLEMENT IT ALSO FOR SEARCH RESULTS?
  // clearProductPrice$: Observable<ProductActions.ClearProductPrice> =
  //   createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(AuthActions.LOGOUT, AuthActions.LOGIN),
  //       map(() => new ProductActions.ClearProductPrice())
  //     )
  //   );
}

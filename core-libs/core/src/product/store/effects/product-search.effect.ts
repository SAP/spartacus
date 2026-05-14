/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, groupBy, map, mergeMap, switchMap } from 'rxjs/operators';
import { LoggerService } from '../../../logger';
import { tryNormalizeHttpError } from '../../../util/try-normalize-http-error';
import { ProductSearchConnector } from '../../connectors/search/product-search.connector';
import { ProductActions } from '../actions/index';
import { HttpErrorModel } from '../../../model';
import {
  GlobalMessageService,
  GlobalMessageType,
} from '../../../global-message';

@Injectable()
export class ProductsSearchEffects {
  protected logger = inject(LoggerService);
  protected globalMessageService = inject(GlobalMessageService);

  searchProducts$: Observable<
    ProductActions.SearchProductsSuccess | ProductActions.SearchProductsFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.SEARCH_PRODUCTS),
      groupBy((action: ProductActions.SearchProducts) => action.auxiliary),
      mergeMap((group) =>
        group.pipe(
          switchMap((action: ProductActions.SearchProducts) => {
            return this.productSearchConnector
              .search(action.payload.queryText, action.payload.searchConfig)
              .pipe(
                map((data) => {
                  return new ProductActions.SearchProductsSuccess(
                    data,
                    action.auxiliary
                  );
                }),
                catchError((error) => {
                  const normalizedError: HttpErrorModel = tryNormalizeHttpError(
                    error,
                    this.logger
                  );
                  if (
                    normalizedError?.details?.[0].type ===
                    'ArrayIndexOutOfBoundsError'
                  ) {
                    this.globalMessageService.add(
                      { key: 'searchBox.queryError' },
                      GlobalMessageType.MSG_TYPE_ERROR
                    );
                  }
                  return of(
                    new ProductActions.SearchProductsFail(
                      normalizedError,
                      action.auxiliary
                    )
                  );
                })
              );
          })
        )
      )
    )
  );

  getProductSuggestions$: Observable<
    | ProductActions.GetProductSuggestionsSuccess
    | ProductActions.GetProductSuggestionsFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.GET_PRODUCT_SUGGESTIONS),
      map((action: ProductActions.GetProductSuggestions) => action.payload),
      switchMap((payload) => {
        return this.productSearchConnector
          .getSuggestions(payload.term, payload.searchConfig?.pageSize)
          .pipe(
            map((suggestions) => {
              if (suggestions === undefined) {
                return new ProductActions.GetProductSuggestionsSuccess([]);
              }
              return new ProductActions.GetProductSuggestionsSuccess(
                suggestions
              );
            }),
            catchError((error) =>
              of(
                new ProductActions.GetProductSuggestionsFail(
                  tryNormalizeHttpError(error, this.logger)
                )
              )
            )
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private productSearchConnector: ProductSearchConnector
  ) {}
}

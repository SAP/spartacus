/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { forkJoin, Observable } from 'rxjs';
import { catchError, groupBy, map, mergeMap } from 'rxjs/operators';
import { LoggerService } from '../../../logger/logger.service';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { bufferDebounceTime } from '../../../util/rxjs/buffer-debounce-time';
import { withdrawOn } from '../../../util/rxjs/withdraw-on';
import { ProductSearchConnector } from '../../connectors/search/product-search.connector';
import { ProductActions } from '../actions/index';
import { tryNormalizeHttpError } from '../../../util/try-normalize-http-error';

@Injectable()
export class ProductSearchByCategoryEffects {
  protected logger = inject(LoggerService);
  private actions$ = inject(Actions);
  private productSearchConnector = inject(ProductSearchConnector);

  private contextChange$: Observable<Action> = this.actions$.pipe(
    ofType(
      SiteContextActions.CURRENCY_CHANGE,
      SiteContextActions.LANGUAGE_CHANGE
    )
  );

  searchByCategory$ = createEffect(
    () =>
      ({ scheduler, debounce = 0 } = {}): Observable<
        | ProductActions.ProductSearchLoadByCategorySuccess
        | ProductActions.ProductSearchLoadByCategoryFail
      > =>
        this.actions$.pipe(
          ofType(ProductActions.PRODUCT_SEARCH_LOAD_BY_CATEGORY),

          groupBy(
            (action: ProductActions.ProductSearchLoadByCategory) =>
              action.payload.scope
          ),
          mergeMap((group) => {
            const scope = group.key;

            return group.pipe(
              map(
                (action: ProductActions.ProductSearchLoadByCategory) =>
                  action.payload
              ),

              bufferDebounceTime(debounce, scheduler),

              mergeMap(
                (payloads: { categoryCode: string; scope: string }[]) => {
                  const categoryCodes = payloads.map(
                    (payload) => payload.categoryCode
                  );

                  return forkJoin(
                    categoryCodes.map((categoryCode) =>
                      this.productSearchConnector.searchByCategory(
                        categoryCode,
                        scope
                      )
                    )
                  ).pipe(
                    mergeMap((searchResults, _index) => {
                      return categoryCodes.map((categoryCode, idx) => {
                        const categoryProducts =
                          searchResults[idx]?.products ?? [];
                        return new ProductActions.ProductSearchLoadByCategorySuccess(
                          {
                            categoryCode,
                            scope,
                            products: categoryProducts,
                          }
                        );
                      });
                    }),
                    catchError(
                      (
                        error
                      ): ProductActions.ProductSearchLoadByCategoryFail[] => {
                        return payloads.map(
                          (payload) =>
                            new ProductActions.ProductSearchLoadByCategoryFail({
                              ...payload,
                              error: tryNormalizeHttpError(error, this.logger),
                            })
                        );
                      }
                    )
                  );
                }
              )
            );
          }),
          withdrawOn(this.contextChange$)
        )
  );
}

/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AuthActions, normalizeHttpError } from '@spartacus/core';
import { Observable } from 'rxjs';
import { catchError, groupBy, map, mergeMap, switchMap } from 'rxjs/operators';
import { LoggerService } from '../../../logger/logger.service';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { bufferDebounceTime } from '../../../util/rxjs/buffer-debounce-time';
import { withdrawOn } from '../../../util/rxjs/withdraw-on';
import { ProductSearchConnector } from '../../connectors/search/product-search.connector';
import { ProductActions } from '../actions/index';

@Injectable()
export class ProductSearchByCodeEffects {
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

  searchByCodes$ = createEffect(
    () =>
      ({ scheduler, debounce = 0 } = {}): Observable<
        | ProductActions.ProductSearchLoadByCodeSuccess
        | ProductActions.ProductSearchLoadByCodeFail
      > =>
        this.actions$.pipe(
          ofType(ProductActions.PRODUCT_SEARCH_LOAD_BY_CODE),

          // We split streams of actions by scope, so later we will be able
          // to call the Connector once per scope for a group of actions having the same scope.
          groupBy(
            (action: ProductActions.ProductSearchLoadByCode) =>
              action.payload.scope
          ),
          mergeMap((group) => {
            const scope = group.key;

            return group.pipe(
              map(
                (action: ProductActions.ProductSearchLoadByCode) =>
                  action.payload
              ),

              // We are grouping all load actions that happen at the same time
              // to optimize loading and pass them all in a single call to the Connector.
              bufferDebounceTime(debounce, scheduler),

              mergeMap((payloads: { code: string; scope: string }[]) => {
                const codes = payloads.map((payload) => payload.code);

                return this.productSearchConnector
                  .searchByCodes(codes, scope)
                  .pipe(
                    switchMap(
                      (
                        searchResults
                      ): ProductActions.ProductSearchLoadByCodeSuccess[] => {
                        // We got all products in a single response from the Connector,
                        // but we need to dispatch separate success actions for each product.
                        const actions = searchResults.products?.map(
                          (product, index) =>
                            new ProductActions.ProductSearchLoadByCodeSuccess({
                              // We assume that the order of the products in the response
                              // is the same as the order of the codes in the request! OCC implementation guarantees that.
                              ...payloads[index],
                              product,
                            })
                        );
                        return actions;
                      }
                    ),
                    catchError(
                      (error): ProductActions.ProductSearchLoadByCodeFail[] => {
                        // We got an error while trying to load many products from the Connector,
                        // but we need to dispatch separate fail actions for each product.
                        const actions = payloads.map(
                          (payload) =>
                            new ProductActions.ProductSearchLoadByCodeFail({
                              ...payload,
                              error: normalizeHttpError(error, this.logger),
                            })
                        );
                        return actions;
                      }
                    )
                  );
              })
            );
          }),
          withdrawOn(this.contextChange$)
        )
  );

  clearState$: Observable<ProductActions.ClearProductSearchByCodeState> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.LOGOUT, AuthActions.LOGIN, 'spikeClear'), // SPIKE TODO remove `spikeClear` after spike
        map(() => new ProductActions.ClearProductSearchByCodeState())
      )
    );

  constructor(protected store: Store<any>) {
    (window as any).dispatch = this.store.dispatch.bind(this.store); // SPIKE TODO remove after spike
  }
}

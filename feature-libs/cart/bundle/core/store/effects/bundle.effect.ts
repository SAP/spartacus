/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartActions } from '@spartacus/cart/base/core';
import {
  LoggerService,
  normalizeHttpError,
  ProductActions,
  SiteContextActions,
  withdrawOn
} from '@spartacus/core';
import { from, Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BundleConnector } from '../../connectors/bundle.connector';
import { BundleActions } from '../actions';

@Injectable()
export class BundleEffects {
  protected logger = inject(LoggerService);

  private contextChange$ = this.actions$.pipe(
    ofType(
      SiteContextActions.CURRENCY_CHANGE,
      SiteContextActions.LANGUAGE_CHANGE
    )
  );

  startBundle$: Observable<
    | BundleActions.StartBundleSuccess
    | BundleActions.StartBundleFail
    | CartActions.LoadCart
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(BundleActions.START_BUNDLE),
      map((action: BundleActions.StartBundle) => action.payload),
      mergeMap((payload) =>
        this.bundleConnector
          .bundleStart(payload.userId, payload.cartId, payload.bundleStarter)
          .pipe(
            map(
              (data) =>
                new BundleActions.StartBundleSuccess(<any>{
                  ...payload,
                  ...data,
                })
            ),
            catchError((error) =>
              from([
                new BundleActions.StartBundleFail({
                  ...payload,
                  error: error,
                }),
                new CartActions.LoadCart({
                  cartId: payload.cartId,
                  userId: payload.userId,
                }),
              ])
            )
          )
      ),
      withdrawOn(this.contextChange$)
    )
  );

  // getBundleAllowedProducts$: Observable<
  //   | BundleActions.GetBundleAllowedProductsSuccess
  //   | BundleActions.GetBundleAllowedProductsFail
  //   | CartActions.LoadCart
  // > = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(BundleActions.GET_BUNDLE_ALLOWED_PRODUCTS),
  //     map((action: BundleActions.GetBundleAllowedProducts) => action.payload),
  //     mergeMap((payload) =>
  //       this.bundleConnector
  //         .bundleAllowedProductsSearch(
  //           payload.userId,
  //           payload.cartId,
  //           payload.entryGroupNumber,
  //           payload.query,
  //           payload.searchConfig
  //         )
  //         .pipe(
  //           map(
  //             (data) =>
  //               new BundleActions.GetBundleAllowedProductsSuccess(<any>{
  //                 ...payload,
  //                 data,
  //               })
  //           ),
  //           catchError((error) =>
  //             from([
  //               new BundleActions.GetBundleAllowedProductsFail({
  //                 ...payload,
  //                 error: error,
  //               }),
  //               new CartActions.LoadCart({
  //                 cartId: payload.cartId,
  //                 userId: payload.userId,
  //               }),
  //             ])
  //           )
  //         )
  //     ),
  //     withdrawOn(this.contextChange$)
  //   )
  // );

  getBundleAllowedProducts$: Observable<
    ProductActions.SearchProductsSuccess | ProductActions.SearchProductsFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(BundleActions.GET_BUNDLE_ALLOWED_PRODUCTS),
      map((action: BundleActions.GetBundleAllowedProducts) => action.payload),
      mergeMap((payload) =>
        this.bundleConnector
          .bundleAllowedProductsSearch(
            payload.userId,
            payload.cartId,
            payload.entryGroupNumber,
            payload.query,
            payload.searchConfig
          )
          .pipe(
            map(
              (data) =>
                new ProductActions.SearchProductsSuccess(
                  data
                )
            ),
            catchError((error) =>
              of(
                new ProductActions.SearchProductsFail(
                  normalizeHttpError(error, this.logger)
                )
              )
            )
          )
      ),
      withdrawOn(this.contextChange$)
    )
  );

  // TODO: Switch to automatic cart reload on processes count reaching 0 for cart entity
  refreshWithoutProcesses$: Observable<CartActions.LoadCart> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BundleActions.START_BUNDLE_SUCCESS),
        map((action: BundleActions.StartBundleSuccess) => action.payload),
        map((payload) => {
          return new CartActions.LoadCart({
            userId: <string>payload.userId,
            cartId: <string>payload.cartId,
          });
        })
      )
  );

  constructor(
    private actions$: Actions,
    private bundleConnector: BundleConnector
  ) {}
}

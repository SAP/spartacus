/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartActions } from '@spartacus/cart/base/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { normalizeHttpError } from '@spartacus/core';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { PickupLocationConnector } from '../../connectors';
import { PickupOptionActions } from '../actions';
import * as PickupLocationActions from '../actions/pickup-location.action';

@Injectable()
export class PickupLocationEffect {
  constructor(
    private actions$: Actions,
    private activeCartFacade: ActiveCartFacade,
    private pickupLocationConnector: PickupLocationConnector
  ) {
    // Intentional empty constructor
  }

  storeDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PickupLocationActions.GET_STORE_DETAILS),
      map(
        (
          action: ReturnType<typeof PickupLocationActions.GetStoreDetailsById>
        ) => action.payload
      ),
      mergeMap((storeName) =>
        this.pickupLocationConnector.getStoreDetails(storeName).pipe(
          map((storeDetails) =>
            PickupLocationActions.SetStoreDetailsSuccess({
              payload: storeDetails,
            })
          ),
          catchError((error) =>
            of(
              PickupLocationActions.SetStoreDetailsFailure({
                payload: normalizeHttpError(error),
              })
            )
          )
        )
      )
    )
  );

  setPickupOptionToDelivery$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PickupLocationActions.SET_PICKUP_OPTION_TO_DELIVERY),
      map(
        (
          action: ReturnType<
            typeof PickupLocationActions.SetPickupOptionToDelivery
          >
        ) => action.payload
      ),
      switchMap(
        ({ cartId, entryNumber, userId, productCode, quantity, page }) =>
          this.pickupLocationConnector
            .setPickupOptionToDelivery(
              cartId,
              entryNumber,
              userId,
              productCode,
              quantity
            )
            .pipe(
              map(() => {
                if (page === 'CheckoutDeliveryMode') {
                  return PickupLocationActions.DeliveryModeSetPickupOptionToDeliverySuccess();
                } else {
                  return PickupLocationActions.SetPickupOptionToDeliverySuccess();
                }
              })
            )
      )
    )
  );

  reloadCartDeliveryModeToShip$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        PickupLocationActions.DELIVERY_MODE_SET_PICKUP_OPTION_TO_PICKUP_IN_STORE_SUCCESS
      ),
      map(() => {
        this.activeCartFacade.reloadActiveCart();
        return PickupLocationActions.ReloadCartSuccess();
      })
    )
  );

  setPickupOptionToPickupInStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PickupLocationActions.SET_PICKUP_OPTION_TO_PICKUP_IN_STORE),
      map(
        (
          action: ReturnType<
            typeof PickupLocationActions.SetPickupOptionToPickupInStore
          >
        ) => action.payload
      ),
      switchMap(({ cartId, entryNumber, userId, storeName, quantity }) =>
        this.pickupLocationConnector
          .setPickupOptionToPickupInStore(
            cartId,
            entryNumber,
            userId,
            storeName,
            quantity
          )
          .pipe(
            map(() => {
              this.activeCartFacade.reloadActiveCart();
              return PickupLocationActions.SetPickupOptionToPickupInStoreSuccess();
            })
          )
      )
    )
  );

  removeEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.CART_REMOVE_ENTRY),
      map((action: CartActions.CartRemoveEntry) => action.payload),
      map((payload) => {
        return PickupOptionActions.RemovePickupOption({
          payload: { entryNumber: parseInt(payload.entryNumber, 10) },
        });
      })
    )
  );

  removeAllEntries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.DELETE_CART),
      map(() => PickupOptionActions.RemoveAllPickupOptions())
    )
  );
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  ActiveCartFacade,
  DeleteCartFailEvent,
  DeleteCartSuccessEvent,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
} from '@spartacus/checkout/base/root';
import {
  Address,
  EventService,
  UserAddressService,
  UserIdService,
} from '@spartacus/core';
import { merge, throwError } from 'rxjs';
import {
  filter,
  map,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

@Injectable()
export class CartHandlerService {
  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
    protected userAddressService: UserAddressService,
    protected multiCartFacade: MultiCartFacade,
    protected userIdService: UserIdService,
    protected eventService: EventService
  ) {}

  addProductTocart(
    productCode: string,
    quantity: number,
    pickupStore?: string | undefined
  ) {
    this.activeCartFacade.addEntry(productCode, quantity, pickupStore);

    return this.checkStableCart();
  }

  removeProductFromCart(productId: string) {
    if (!productId) {
      return throwError('');
    }
    if (productId) {
      return (
        this.activeCartFacade.getLastEntry(productId).pipe(take(1)),
        tap((entry) => {
          if (entry) {
            this.activeCartFacade.removeEntry(entry);
          }
        }),
        switchMap(() => {
          return this.checkStableCart();
        })
      );
    }
  }

  checkStableCart() {
    return this.activeCartFacade.isStable().pipe(
      filter((isStable) => !!isStable),
      take(1)
    );
  }

  getDeliveryModes() {
    return this.checkoutDeliveryModesFacade.getSupportedDeliveryModes();
  }

  setDeliveryAddress(address: Address) {
    return this.checkoutDeliveryAddressFacade
      .createAndSetAddress(address)
      .pipe(switchMap(() => this.checkStableCart()));
  }

  getDeliveryAddress() {
    return this.checkoutDeliveryAddressFacade.getDeliveryAddressState().pipe(
      filter((state) => !state.loading),
      take(1),
      map((state) => {
        return state.data;
      })
    );
  }

  updateCurrentCartDeliveryAddress(newAddress: Address) {
    return this.getDeliveryAddress().pipe(
      switchMap((address) => {
        if (!address?.id) {
          return this.setDeliveryAddress(newAddress);
        }
        return this.updateDeliveryAddress(address?.id as string, newAddress);
      })
    );
  }

  getCurrentCart() {
    return this.activeCartFacade.getActive();
  }

  setDeliveryMode(mode: string) {
    return this.checkoutDeliveryModesFacade.setDeliveryMode(mode).pipe(
      switchMap(() =>
        this.checkoutDeliveryModesFacade.getSelectedDeliveryModeState()
      ),
      filter((state) => !state.error && !state.loading),
      take(1),
      map((state) => state.data)
    );
  }

  getSelectedDeliveryMode() {
    this.checkoutDeliveryModesFacade.getSelectedDeliveryModeState().pipe(
      filter((state) => !state.error && !state.loading),
      take(1),
      map((state) => state.data)
    );
  }

  updateDeliveryAddress(targetId: string, address: Address) {
    this.userAddressService.updateUserAddress(targetId, address);
    return this.checkoutDeliveryAddressFacade.getDeliveryAddressState().pipe(
      filter((state) => !state.error && !state.loading),
      take(1),
      map((state) => {
        !!state.data;
      })
    );
  }

  deleteCurrentCart() {
    return this.activeCartFacade.getActiveCartId().pipe(
      withLatestFrom(this.userIdService.getUserId()),
      take(1),
      tap(([cartId, userId]) => {
        this.multiCartFacade.deleteCart(cartId, userId);
      }),
      switchMap(() =>
        merge(
          this.eventService.get(DeleteCartSuccessEvent).pipe(map(() => true)),
          this.eventService.get(DeleteCartFailEvent).pipe(map(() => false))
        ).pipe(take(1))
      )
    );
  }
}

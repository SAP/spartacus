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
  DeliveryMode,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import {
  CheckoutBillingAddressFacade,
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
} from '@spartacus/checkout/base/root';
import {
  Address,
  EventService,
  UserAddressService,
  UserIdService,
} from '@spartacus/core';
import { Observable, combineLatest, merge, throwError, timer } from 'rxjs';
import {
  filter,
  map,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartHandlerService {
  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
    protected userAddressService: UserAddressService,
    protected multiCartFacade: MultiCartFacade,
    protected userIdService: UserIdService,
    protected eventService: EventService,
    protected checkoutBillingAddressFacade: CheckoutBillingAddressFacade
  ) {}

  addProductToCart(
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

  getCartandUser() {
    return combineLatest([
      this.activeCartFacade.getActiveCartId(),
      this.userIdService.getUserId(),
      this.activeCartFacade.isStable(),
    ]).pipe(
      filter(
        ([_, userId, isStable]: [string, string, boolean]) =>
          !!userId && isStable
      )
    );
  }

  checkStableCart() {
    return this.activeCartFacade.isStable().pipe(
      filter((isStable) => !!isStable),
      take(1)
    );
  }

  getSupportedDeliveryModes() {
    return this.checkoutDeliveryModesFacade.getSupportedDeliveryModes();
  }

  setDeliveryAddress(address: Address) {
    return this.checkoutDeliveryAddressFacade
      .createAndSetAddress(address)
      .pipe(switchMap(() => this.checkStableCart()));
  }

  setBillingAddress(address: Address) {
    return this.checkoutBillingAddressFacade
      .setBillingAddress(address)
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
        console.log('getDeliveryAddr', address);
        if (!address?.id) {
          return this.setDeliveryAddress(newAddress);
        }
        return this.updateDeliveryAddress(address?.id as string, newAddress);
      })
    );
  }

  getCurrentCart() {
    return this.activeCartFacade.takeActive();
  }

  getCurrentCartId() {
    return this.activeCartFacade.takeActiveCartId();
  }

  getCurrentCartTotalPrice() {
    return this.activeCartFacade
      .getActive()
      .pipe(map((cart) => cart.totalPrice?.value));
  }

  setDeliveryMode(mode: string) {
    console.log('Setting Delivery Mode as: ' + mode);
    return this.checkoutDeliveryModesFacade.setDeliveryMode(mode).pipe(
      switchMap(() =>
        this.checkoutDeliveryModesFacade.getSelectedDeliveryModeState()
      ),
      filter((state) => !state.error && !state.loading),
      take(1),
      map((state) => state.data)
    );
  }

  getSelectedDeliveryMode(): Observable<DeliveryMode | undefined> {
    return this.checkoutDeliveryModesFacade.getSelectedDeliveryModeState().pipe(
      filter((state) => !state.error && !state.loading),
      take(1),
      map((state) => state.data)
    );
  }

  updateDeliveryAddress(targetId: string, address: Address) {
    console.log('targetId', targetId);
    return this.setDeliveryAddress(address).pipe(
      // return this.checkoutDeliveryAddressFacade.getDeliveryAddressState().pipe(
      // switchMap(() =>
      //   this.checkoutDeliveryAddressFacade.getDeliveryAddressState()
      // ),
      // filter((state) => !state.error && !state.loading),
      // take(1),
      // map((state) => {
      //   !!state.data;
      // }),
      tap(() => {
        console.log('do smth', targetId);
        timer(10000).subscribe(
          () => {
            console.log('in timer');
            //  this.userAddressService.deleteUserAddress(targetId);
          }
          // this.userAddressService.deleteUserAddress(targetId);
        );
      })
    );
  }

  deleteCurrentCart() {
    // return of({});
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

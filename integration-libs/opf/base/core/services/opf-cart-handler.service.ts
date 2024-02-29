/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  ActiveCartFacade,
  Cart,
  CartType,
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
  QueryState,
  UserAddressService,
  UserIdService,
} from '@spartacus/core';
import {
  OpfGlobalMessageService,
  OpfMiniCartComponentService,
} from '@spartacus/opf/base/root';
import { Observable, combineLatest, merge, of, throwError } from 'rxjs';
import {
  catchError,
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
export class OpfCartHandlerService {
  protected activeCartFacade = inject(ActiveCartFacade);
  protected checkoutDeliveryModesFacade = inject(CheckoutDeliveryModesFacade);
  protected checkoutDeliveryAddressFacade = inject(
    CheckoutDeliveryAddressFacade
  );
  protected userAddressService = inject(UserAddressService);
  protected multiCartFacade = inject(MultiCartFacade);
  protected userIdService = inject(UserIdService);
  protected eventService = inject(EventService);
  protected checkoutBillingAddressFacade = inject(CheckoutBillingAddressFacade);
  protected opfGlobalMessageService = inject(OpfGlobalMessageService);
  protected opfMiniCartComponentService = inject(OpfMiniCartComponentService);
  protected currentCartId: string;
  protected previousCartId: string;
  protected currentUserId: string;

  protected addProductToNewCart(
    productCode: string,
    quantity: number,
    originalCartId: string,
    pickupStore?: string | undefined
  ): Observable<boolean> {
    console.log('addMultipleProductToMultipleCart');
    this.previousCartId = originalCartId;

    return this.multiCartFacade
      .createCart({
        userId: this.currentUserId,
        extraData: { active: false },
      })
      .pipe(
        take(1),
        switchMap((cart: Cart) => {
          console.log('addEntry on ', cart.code);
          if (!cart?.code) {
            return throwError('CartId missing from new created cart');
          }
          this.currentCartId = cart.code;
          this.multiCartFacade.addEntry(
            this.currentUserId,
            this.currentCartId,
            productCode,
            quantity,
            pickupStore
          );
          return this.checkStableCart(this.currentCartId);
        }),
        switchMap(() => {
          this.multiCartFacade.loadCart({
            cartId: this.currentCartId,
            userId: this.currentUserId,
            extraData: { active: true },
          });
          return this.checkStableCart(this.currentCartId);
        })
      );
  }

  protected addProductToActiveCart(
    productCode: string,
    quantity: number,
    pickupStore?: string | undefined
  ): Observable<boolean> {
    console.log('addProductToActiveCart');
    this.activeCartFacade.addEntry(productCode, quantity, pickupStore);
    return this.checkStableCart();
  }

  addProductToCart(
    productCode: string,
    quantity: number,
    pickupStore?: string | undefined
  ): Observable<boolean> {
    this.previousCartId = '';
    return combineLatest([
      this.userIdService.takeUserId(),
      this.multiCartFacade.getCartIdByType(CartType.ACTIVE),
      this.activeCartFacade.isStable(),
    ]).pipe(
      take(1),
      tap(() => this.opfMiniCartComponentService.blockUpdate(true)),
      switchMap(([userId, cartId, isStable]) => {
        console.log('isStable', isStable);
        console.log('takeActiveCartId', cartId);
        this.currentUserId = userId;
        if (cartId) {
          return this.addProductToNewCart(
            productCode,
            quantity,
            cartId,
            pickupStore
          );
        }
        return this.addProductToActiveCart(
          productCode,
          quantity,
          pickupStore
        ).pipe(take(1));
      }),
      catchError((error) => {
        console.log('flo error', error);
        return throwError(error);
      })
    );
  }

  loadOriginalCart(): Observable<boolean> {
    console.log('flo load previous cart', this.previousCartId);
    if (!this.previousCartId) {
      this.opfMiniCartComponentService.blockUpdate(false);
      return of(true);
    }
    this.multiCartFacade.loadCart({
      cartId: this.previousCartId,
      userId: this.currentUserId,
      extraData: { active: true },
    });
    return this.checkStableCart().pipe(
      tap(() => this.opfMiniCartComponentService.blockUpdate(false))
    );
  }

  checkStableCart(cartId?: string): Observable<boolean> {
    return cartId
      ? this.multiCartFacade.isStable(cartId).pipe(
          filter((isStable) => !!isStable),
          take(1)
        )
      : this.activeCartFacade.isStable().pipe(
          filter((isStable) => !!isStable),
          take(1)
        );
  }

  getSupportedDeliveryModes(): Observable<DeliveryMode[]> {
    return this.checkoutDeliveryModesFacade.getSupportedDeliveryModes();
  }

  setDeliveryAddress(address: Address): Observable<string> {
    this.opfGlobalMessageService.disableGlobalMessage([
      'addressForm.userAddressAddSuccess',
    ]);
    return this.checkoutDeliveryAddressFacade.createAndSetAddress(address).pipe(
      switchMap(() => this.checkStableCart()),
      switchMap(() =>
        this.getDeliveryAddress().pipe(
          map((addr: Address | undefined) => addr?.id ?? '')
        )
      )
    );
  }

  setBillingAddress(address: Address): Observable<boolean> {
    return this.checkoutBillingAddressFacade
      .setBillingAddress(address)
      .pipe(switchMap(() => this.checkStableCart()));
  }

  getDeliveryAddress(): Observable<Address | undefined> {
    return this.checkoutDeliveryAddressFacade.getDeliveryAddressState().pipe(
      filter((state: QueryState<Address | undefined>) => !state.loading),
      take(1),
      map((state: QueryState<Address | undefined>) => {
        return state.data;
      })
    );
  }

  getCurrentCart(): Observable<Cart> {
    return this.activeCartFacade.takeActive();
  }

  getCurrentCartId(): Observable<string> {
    return this.activeCartFacade.takeActiveCartId();
  }

  getCurrentCartTotalPrice(): Observable<number | undefined> {
    return this.activeCartFacade
      .getActive()
      .pipe(map((cart: Cart) => cart.totalPrice?.value));
  }

  setDeliveryMode(mode: string): Observable<DeliveryMode | undefined> {
    return this.checkoutDeliveryModesFacade.setDeliveryMode(mode).pipe(
      switchMap(() =>
        this.checkoutDeliveryModesFacade.getSelectedDeliveryModeState()
      ),
      filter(
        (state: QueryState<DeliveryMode | undefined>) =>
          !state.error && !state.loading
      ),
      take(1),
      map((state: QueryState<DeliveryMode | undefined>) => state.data)
    );
  }

  getSelectedDeliveryMode(): Observable<DeliveryMode | undefined> {
    return this.checkoutDeliveryModesFacade.getSelectedDeliveryModeState().pipe(
      filter(
        (state: QueryState<DeliveryMode | undefined>) =>
          !state.error && !state.loading
      ),
      take(1),
      map((state: QueryState<DeliveryMode | undefined>) => state.data)
    );
  }

  deleteUserAddresses(addrIds: string[]): void {
    this.opfGlobalMessageService.disableGlobalMessage([
      'addressForm.userAddressDeleteSuccess',
    ]);
    addrIds.forEach((addrId) => {
      this.userAddressService.deleteUserAddress(addrId);
    });
  }

  deleteCurrentCart(): Observable<boolean> {
    console.log('deleteCurrentCart');
    // return of(true);
    return this.activeCartFacade.getActiveCartId().pipe(
      withLatestFrom(this.userIdService.getUserId()),
      take(1),
      tap(([cartId, userId]: [string, string]) => {
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

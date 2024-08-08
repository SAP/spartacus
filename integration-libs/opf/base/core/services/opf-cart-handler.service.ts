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
  CartHandlerState,
  OpfGlobalMessageService,
  OpfMiniCartComponentService,
} from '@spartacus/opf/base/root';
import { Observable, combineLatest, throwError } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

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
  protected defaultCartHandlerState: CartHandlerState = {
    cartId: '',
    userId: '',
    previousCartId: '',
  };
  protected cartHandlerState: CartHandlerState = {
    ...this.defaultCartHandlerState,
  };

  protected addProductToNewCart(
    productCode: string,
    quantity: number,
    originalCartId: string,
    pickupStore?: string | undefined
  ): Observable<boolean> {
    this.cartHandlerState.previousCartId = originalCartId;

    return this.multiCartFacade
      .createCart({
        userId: this.cartHandlerState.userId,
        extraData: { active: false },
      })
      .pipe(
        take(1),
        switchMap((cart: Cart) => {
          if (!cart?.code) {
            return throwError(
              () => new Error('CartId missing from new created cart')
            );
          }
          this.cartHandlerState.cartId = cart.code;
          this.multiCartFacade.addEntry(
            this.cartHandlerState.userId,
            this.cartHandlerState.cartId,
            productCode,
            quantity,
            pickupStore
          );
          return this.isCartStable(this.cartHandlerState.cartId);
        }),
        switchMap(() => {
          this.multiCartFacade.loadCart({
            cartId: this.cartHandlerState.cartId,
            userId: this.cartHandlerState.userId,
            extraData: { active: false },
          });
          return this.isCartStable(this.cartHandlerState.cartId);
        })
      );
  }

  addProductToCart(
    productCode: string,
    quantity: number,
    pickupStore?: string | undefined
  ): Observable<boolean> {
    this.cartHandlerState = { ...this.defaultCartHandlerState };
    return combineLatest([
      this.userIdService.takeUserId(),
      this.multiCartFacade.getCartIdByType(CartType.ACTIVE),
      this.activeCartFacade.isStable(),
    ]).pipe(
      take(1),
      switchMap(([userId, cartId, _]) => {
        this.cartHandlerState.userId = userId;

        return this.addProductToNewCart(
          productCode,
          quantity,
          cartId,
          pickupStore
        );
      })
    );
  }

  setDeliveryAddress(address: Address): Observable<string> {
    this.opfGlobalMessageService.disableGlobalMessage([
      'addressForm.userAddressAddSuccess',
    ]);
    return this.checkoutDeliveryAddressFacade.createAndSetAddress(address).pipe(
      switchMap(() => this.isCartStable()),
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
      .pipe(switchMap(() => this.isCartStable()));
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
  deleteUserAddress(addressId: string): void {
    this.userAddressService.deleteUserAddress(addressId);
  }

  getCart(cartId: string): Observable<Cart> {
    return this.multiCartFacade.getCart(cartId);
  }

  getCartId(): string {
    console.log('CarId from service: ', this.cartHandlerState.cartId);
    return this.cartHandlerState.cartId;
  }

  isCartStable(cartId?: string): Observable<boolean> {
    return (
      cartId
        ? this.multiCartFacade.isStable(cartId)
        : this.activeCartFacade.isStable()
    ).pipe(
      filter((isStable) => !!isStable),
      take(1)
    );
  }

  getSupportedDeliveryModes(): Observable<DeliveryMode[]> {
    return this.checkoutDeliveryModesFacade.getSupportedDeliveryModes();
  }

  getCartDeliveryMode(cartId: string): Observable<DeliveryMode | undefined> {
    return this.multiCartFacade.getCart(cartId).pipe(
      filter((cart: Cart) => !!cart.deliveryMode),
      map((cart: Cart) => cart.deliveryMode)
    );
  }

  setCartDeliveryMode(
    cartId: string,
    deliveryMode: DeliveryMode
  ): Observable<Cart> {
    return this.multiCartFacade.updateCart(cartId, {
      deliveryMode: deliveryMode,
    });
  }

  getCartDeliveryAddress(cartId: string): Observable<Address | undefined> {
    return this.multiCartFacade.getCart(cartId).pipe(
      filter((cart: Cart) => !!cart.deliveryAddress),
      map((cart: Cart) => cart.deliveryAddress)
    );
  }

  setCartDeliveryAddress(
    cartId: string,
    deliveryAddress: Address
  ): Observable<Cart> {
    return this.multiCartFacade.updateCart(cartId, {
      deliveryAddress: deliveryAddress,
    });
  }
}

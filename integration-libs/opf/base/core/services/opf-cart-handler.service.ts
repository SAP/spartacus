/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  ActiveCartFacade,
  Cart,
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
  OpfCartFacade,
  OpfGlobalMessageService,
} from '@spartacus/opf/base/root';
import { Observable, throwError } from 'rxjs';
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
  protected opfCartFacade = inject(OpfCartFacade);

  protected defaultCartHandlerState: CartHandlerState = {
    cartId: '',
    userId: '',
  };

  protected cartHandlerState: CartHandlerState = {
    ...this.defaultCartHandlerState,
  };

  addProductToNewCart(
    productCode: string,
    quantity: number,
    pickupStore?: string | undefined
  ): Observable<boolean> {
    this.cartHandlerState = { ...this.defaultCartHandlerState };
    return this.userIdService.takeUserId().pipe(
      take(1),
      switchMap((userId) => {
        this.cartHandlerState.userId = userId;
        return this.multiCartFacade
          .createCart({
            userId: userId,
            extraData: { active: false },
          })
          .pipe(
            take(1),
            switchMap((cart: Cart) => {
              if (!cart?.code) {
                return throwError(
                  () => new Error('Cart does not contain an ID!')
                );
              }
              this.cartHandlerState.cartId = cart.code;
              console.log(cart.code);
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
          )
          .pipe(take(1));
      })
    );
  }

  isCartStable(cartId: string): Observable<boolean> {
    return this.multiCartFacade.isStable(cartId).pipe(
      filter((isStable) => !!isStable),
      take(1)
    );
  }

  setCartBillingAddress(
    billingAddress: Address,
    cartId?: string
  ): Observable<Address> {
    return this.userIdService.takeUserId().pipe(
      switchMap((userId) => {
        return this.opfCartFacade.setCartBillingAddress(
          userId,
          cartId || this.cartHandlerState.cartId,
          billingAddress
        );
      })
    );
  }

  setCartDeliveryAddress(
    deliveryAddressOrAddressId: Address | string,
    cartId?: string
  ): Observable<Address> {
    return this.userIdService.takeUserId().pipe(
      switchMap((userId) => {
        if (typeof deliveryAddressOrAddressId === 'string') {
          return this.opfCartFacade.setCartDeliveryAddress(
            userId,
            cartId || this.cartHandlerState.cartId,
            deliveryAddressOrAddressId
          );
        }

        return this.opfCartFacade.createCartDeliveryAddress(
          userId,
          cartId || this.cartHandlerState.cartId,
          deliveryAddressOrAddressId as Address
        );
      })
    );
  }

  clearCartDeliveryAddress(cartId?: string): Observable<Address> {
    return this.userIdService.takeUserId().pipe(
      switchMap((userId) => {
        return this.opfCartFacade.deleteCartDeliveryAddress(
          userId,
          cartId || this.cartHandlerState.cartId
        );
      })
    );
  }

  getCartDeliveryMode(cartId?: string): Observable<DeliveryMode | undefined> {
    return this.userIdService.takeUserId().pipe(
      switchMap((userId) => {
        return this.opfCartFacade.getCartDeliveryMode(
          userId,
          cartId || this.cartHandlerState.cartId
        );
      })
    );
  }

  getPossibleCartDeliveryModeOptions(
    cartId?: string
  ): Observable<DeliveryMode[] | undefined> {
    return this.userIdService.takeUserId().pipe(
      switchMap((userId) => {
        return this.opfCartFacade.getPossibleCartDeliveryModeOptions(
          userId,
          cartId || this.cartHandlerState.cartId
        );
      })
    );
  }

  setCartDeliveryMode(
    deliveryModeId: string,
    cartId?: string
  ): Observable<DeliveryMode> {
    return this.userIdService.takeUserId().pipe(
      switchMap((userId) => {
        return this.opfCartFacade.setCartDeliveryMode(
          userId,
          cartId || this.cartHandlerState.cartId,
          deliveryModeId
        );
      })
    );
  }

  clearCartDeliveryMode(cartId?: string): Observable<DeliveryMode> {
    return this.userIdService.takeUserId().pipe(
      switchMap((userId) => {
        return this.opfCartFacade.deleteCartDeliveryMode(
          userId,
          cartId || this.cartHandlerState.cartId
        );
      })
    );
  }

  getCart(cartId?: string): Observable<Cart> {
    return this.multiCartFacade.getCart(cartId || this.cartHandlerState.cartId);
  }

  /** OLD METHODS */

  getSupportedDeliveryModes(): Observable<DeliveryMode[]> {
    return this.checkoutDeliveryModesFacade.getSupportedDeliveryModes();
  }

  setDeliveryAddress(address: Address): Observable<string> {
    this.opfGlobalMessageService.disableGlobalMessage([
      'addressForm.userAddressAddSuccess',
    ]);
    return this.checkoutDeliveryAddressFacade.createAndSetAddress(address).pipe(
      switchMap(() => this.isCartStable(this.cartHandlerState.cartId)),
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
      .pipe(switchMap(() => this.isCartStable(this.cartHandlerState.cartId)));
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
}

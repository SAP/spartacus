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
  OrderEntry,
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
  OpfQuickBuyLocation,
  QuickBuyTransactionDetails,
} from '@spartacus/opf/base/root';
import {
  Observable,
  combineLatest,
  forkJoin,
  merge,
  of,
  throwError,
} from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

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
          return this.checkStableCart(this.cartHandlerState.cartId);
        }),
        switchMap(() => {
          this.multiCartFacade.loadCart({
            cartId: this.cartHandlerState.cartId,
            userId: this.cartHandlerState.userId,
            extraData: { active: true },
          });
          return this.checkStableCart(this.cartHandlerState.cartId);
        })
      );
  }

  protected addProductToActiveCart(
    productCode: string,
    quantity: number,
    pickupStore?: string | undefined
  ): Observable<boolean> {
    this.activeCartFacade.addEntry(productCode, quantity, pickupStore);
    return this.checkStableCart().pipe(
      switchMap(() => this.getCurrentCartId()),
      map((cartId) => {
        this.cartHandlerState.cartId = cartId;
        return true;
      })
    );
  }

  blockMiniCartComponentUpdate(decision: boolean) {
    this.opfMiniCartComponentService.blockUpdate(decision);
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
      tap(() => this.blockMiniCartComponentUpdate(true)),
      switchMap(([userId, cartId, _]) => {
        this.cartHandlerState.userId = userId;
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
      })
    );
  }

  loadOriginalCart(): Observable<boolean> {
    if (!this.cartHandlerState.previousCartId) {
      this.opfMiniCartComponentService.blockUpdate(false);
      return of(false);
    }
    this.multiCartFacade.loadCart({
      cartId: this.cartHandlerState.previousCartId,
      userId: this.cartHandlerState.userId,
      extraData: { active: true },
    });
    return this.activeCartFacade.getActiveCartId().pipe(
      filter((cartId) => cartId === this.cartHandlerState.previousCartId),
      take(1),
      switchMap(() => {
        return forkJoin({
          activeCartStable: this.checkStableCart(
            this.cartHandlerState.previousCartId
          ),
          staleCartStable: this.checkStableCart(this.cartHandlerState.cartId),
        });
      }),
      map(() => true),
      tap(() => this.blockMiniCartComponentUpdate(false))
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

  deleteStaleCart(): Observable<boolean> {
    if (!this.cartHandlerState.cartId || !this.cartHandlerState.userId) {
      return of(false);
    }

    this.multiCartFacade.deleteCart(
      this.cartHandlerState.cartId,
      this.cartHandlerState.userId
    );

    return merge(
      this.eventService.get(DeleteCartSuccessEvent).pipe(map(() => true)),
      this.eventService.get(DeleteCartFailEvent).pipe(map(() => false))
    ).pipe(take(1));
  }

  removeProductFromOriginalCart(
    productCode: string,
    quantity: number
  ): Observable<boolean> {
    if (
      !this.cartHandlerState.previousCartId ||
      !this.cartHandlerState.userId
    ) {
      return of(false);
    }
    return this.multiCartFacade
      .getEntry(this.cartHandlerState.previousCartId, productCode)
      .pipe(
        map((entry: OrderEntry | undefined) => {
          if (!entry || !entry?.quantity || entry?.entryNumber === undefined) {
            return false;
          }
          if (entry.quantity <= quantity) {
            this.multiCartFacade.removeEntry(
              this.cartHandlerState.userId,
              this.cartHandlerState.previousCartId,
              entry.entryNumber
            );
            return true;
          }

          this.multiCartFacade.updateEntry(
            this.cartHandlerState.userId,
            this.cartHandlerState.previousCartId,
            entry.entryNumber,
            entry.quantity - quantity
          );
          return true;
        })
      );
  }

  loadCartAfterSingleProductTransaction(
    transactionDetails: QuickBuyTransactionDetails,
    orderSuccess = false
  ): Observable<boolean> {
    if (transactionDetails.context === OpfQuickBuyLocation.PRODUCT) {
      return this.loadOriginalCart().pipe(
        switchMap((cartLoaded) => {
          // No initial cart and order placed successfully: don't delete cart as done oob
          if (!cartLoaded && orderSuccess) {
            return of(true);
          }
          if (
            cartLoaded &&
            orderSuccess &&
            transactionDetails?.product?.code &&
            transactionDetails?.quantity
          ) {
            return this.removeProductFromOriginalCart(
              transactionDetails?.product?.code,
              transactionDetails?.quantity
            );
          }
          return this.deleteStaleCart();
        }),
        take(1)
      );
    }
    return of(false);
  }
}

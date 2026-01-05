/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import {
  ActiveCartFacade,
  Cart,
  CartGuestUser,
  CartGuestUserFacade,
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
  AuthService,
  BaseSiteService,
  QueryState,
  RoutingService,
  UserAddressService,
  UserIdService,
} from '@spartacus/core';
import { OpfGlobalMessageService } from '@spartacus/opf/base/root';
import {
  OPF_QUICK_BUY_DEFAULT_MERCHANT_NAME,
  OpfQuickBuyDeliveryInfo,
  OpfQuickBuyDeliveryType,
  OpfQuickBuyLocation,
} from '@spartacus/opf/quick-buy/root';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class OpfQuickBuyTransactionService {
  protected baseSiteService = inject(BaseSiteService);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected routingService = inject(RoutingService);
  protected checkoutDeliveryModesFacade = inject(CheckoutDeliveryModesFacade);
  protected checkoutDeliveryAddressFacade = inject(
    CheckoutDeliveryAddressFacade
  );
  protected checkoutBillingAddressFacade = inject(CheckoutBillingAddressFacade);
  protected userAddressService = inject(UserAddressService);
  protected opfGlobalMessageService = inject(OpfGlobalMessageService);
  protected cartGuestUserFacade = inject(CartGuestUserFacade);
  protected authService = inject(AuthService);
  protected userIdService = inject(UserIdService);
  protected multiCartFacade = inject(MultiCartFacade);

  getTransactionDeliveryType(): Observable<OpfQuickBuyDeliveryType> {
    return this.activeCartFacade.hasDeliveryItems().pipe(
      take(1),
      map((hasDeliveryItems: boolean) =>
        hasDeliveryItems
          ? OpfQuickBuyDeliveryType.SHIPPING
          : OpfQuickBuyDeliveryType.PICKUP
      )
    );
  }

  getTransactionDeliveryInfo(): Observable<OpfQuickBuyDeliveryInfo> {
    const deliveryTypeObservable = this.getTransactionDeliveryType().pipe(
      map((deliveryType) => {
        return {
          type: deliveryType,
        } as OpfQuickBuyDeliveryInfo;
      })
    );

    return deliveryTypeObservable.pipe(take(1));
  }

  getTransactionLocationContext(): Observable<OpfQuickBuyLocation> {
    return this.routingService.getRouterState().pipe(
      take(1),
      map(
        (routerState) =>
          routerState?.state?.semanticRoute?.toLocaleUpperCase() as OpfQuickBuyLocation
      )
    );
  }

  getMerchantName(): Observable<string> {
    return this.baseSiteService.get().pipe(
      take(1),
      map((baseSite) => baseSite?.name ?? OPF_QUICK_BUY_DEFAULT_MERCHANT_NAME)
    );
  }

  checkStableCart(): Observable<boolean> {
    return this.activeCartFacade.isStable().pipe(
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
      .takeActive()
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
    this.authService
      .isUserLoggedIn()
      .pipe(take(1))
      .subscribe((isUserLoggedIn) => {
        if (isUserLoggedIn) {
          this.opfGlobalMessageService.disableGlobalMessage([
            'addressForm.userAddressDeleteSuccess',
          ]);
          addrIds.forEach((addrId) => {
            this.userAddressService.deleteUserAddress(addrId);
          });
        }
      });
  }

  createCartGuestUser(): Observable<boolean> {
    return combineLatest([
      this.userIdService.takeUserId(),
      this.activeCartFacade.takeActiveCartId(),
    ]).pipe(
      take(1),
      switchMap(([userId, cartId]) => {
        return this.cartGuestUserFacade
          .createCartGuestUser(userId, cartId)
          .pipe(
            tap(() => this.multiCartFacade.reloadCart(cartId)),
            map(() => true)
          );
      })
    );
  }

  protected updateCartGuestUser(
    cartGuestUser: CartGuestUser
  ): Observable<boolean> {
    return combineLatest([
      this.userIdService.takeUserId(),
      this.activeCartFacade.takeActiveCartId(),
    ]).pipe(
      take(1),
      switchMap(([userId, cartId]) => {
        return this.cartGuestUserFacade
          .updateCartGuestUser(userId, cartId, cartGuestUser)
          .pipe(
            tap(() => this.multiCartFacade.reloadCart(cartId)),
            map(() => true)
          );
      })
    );
  }

  updateCartGuestUserEmail(email: string): Observable<boolean> {
    return this.activeCartFacade.isGuestCart().pipe(
      take(1),
      switchMap((isGuestCart) => {
        return isGuestCart && email
          ? this.updateCartGuestUser({ email })
          : of(false);
      })
    );
  }

  handleCartGuestUser(): Observable<boolean> {
    return combineLatest([
      this.authService.isUserLoggedIn(),
      this.activeCartFacade.isGuestCart(),
    ]).pipe(
      take(1),
      switchMap(([isUserLoggedIn, isGuestCart]) => {
        if (isUserLoggedIn || isGuestCart) {
          return of(true);
        }

        return this.createCartGuestUser();
      })
    );
  }
}

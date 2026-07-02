/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { getCartIdByUserId } from '@spartacus/cart/base/core';
import {
  ActiveCartFacade,
  Cart,
  CartGuestUser,
  CartGuestUserFacade,
  DeliveryMode,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import {
  Address,
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  UnifiedInjector,
  UserIdService,
} from '@spartacus/core';
import {
  OpfQuickBuyDeliveryInfo,
  OpfQuickBuyDeliveryType,
  OpfQuickBuySingleProductCartOptionsFacade,
} from '@spartacus/opf/quick-buy/root';
import { combineLatest, defer, Observable, of, throwError } from 'rxjs';
import { filter, map, skip, switchMap, take, tap } from 'rxjs/operators';
import { OpfQuickBuyCartConnector } from '../../connectors';

const SINGLE_PRODUCT_CART_NOT_INITIALIZED_ERROR =
  'Single product cart is not initialized';

@Injectable({
  providedIn: 'root',
})
export class OpfQuickBuySingleProductTransactionService {
  protected multiCartFacade = inject(MultiCartFacade);
  protected userIdService = inject(UserIdService);
  protected routingService = inject(RoutingService);
  protected unifiedInjector = inject(UnifiedInjector);
  protected globalMessageService = inject(GlobalMessageService);
  protected cartGuestUserFacade = inject(CartGuestUserFacade);
  protected authService = inject(AuthService);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected singleProductCartOptions = inject(
    OpfQuickBuySingleProductCartOptionsFacade
  );

  protected userId?: string;
  protected cartId?: string;

  getTransactionDeliveryType(): Observable<OpfQuickBuyDeliveryType> {
    if (!this.cartId) {
      return throwError(
        () => new Error(SINGLE_PRODUCT_CART_NOT_INITIALIZED_ERROR)
      );
    }

    return this.waitForStableCart(this.cartId).pipe(
      map((cart) =>
        this.hasDeliveryItems(cart)
          ? OpfQuickBuyDeliveryType.SHIPPING
          : OpfQuickBuyDeliveryType.PICKUP
      )
    );
  }

  getTransactionDeliveryInfo(): Observable<OpfQuickBuyDeliveryInfo> {
    return this.getTransactionDeliveryType().pipe(
      map(
        (deliveryType) =>
          ({
            type: deliveryType,
          }) as OpfQuickBuyDeliveryInfo
      ),
      take(1)
    );
  }

  checkStableCart(): Observable<boolean> {
    if (!this.cartId) {
      return throwError(
        () => new Error(SINGLE_PRODUCT_CART_NOT_INITIALIZED_ERROR)
      );
    }

    return this.multiCartFacade.isStable(this.cartId).pipe(
      filter((isStable) => !!isStable),
      take(1)
    );
  }

  getSupportedDeliveryModes(): Observable<DeliveryMode[]> {
    return this.getCartContext().pipe(
      switchMap(({ userId, cartId }) =>
        this.getCartConnector().pipe(
          switchMap((connector) =>
            connector.getSupportedDeliveryModes(userId, cartId)
          )
        )
      )
    );
  }

  setDeliveryAddress(address: Address): Observable<string> {
    return this.getCartContext().pipe(
      switchMap(({ userId, cartId }) =>
        this.createDeliveryAddressAndReload(userId, cartId, address)
      )
    );
  }

  setBillingAddress(address: Address): Observable<boolean> {
    return this.getCartContext().pipe(
      switchMap(({ userId, cartId }) =>
        this.getCartConnector().pipe(
          switchMap((connector) =>
            connector.setBillingAddress(userId, cartId, address).pipe(
              switchMap(() => this.reloadCartAndWait(userId, cartId)),
              map(() => true)
            )
          )
        )
      )
    );
  }

  getDeliveryAddress(): Observable<Address | undefined> {
    return this.getCart().pipe(map((cart) => cart.deliveryAddress));
  }

  getCurrentCart(): Observable<Cart> {
    return this.getCart();
  }

  getCurrentCartId(): Observable<string> {
    if (!this.cartId) {
      return throwError(
        () => new Error(SINGLE_PRODUCT_CART_NOT_INITIALIZED_ERROR)
      );
    }

    return of(this.cartId);
  }

  getCurrentCartTotalPrice(): Observable<number | undefined> {
    return this.getCart().pipe(map((cart) => cart.totalPrice?.value));
  }

  setDeliveryMode(mode: string): Observable<DeliveryMode | undefined> {
    return this.getCartContext().pipe(
      switchMap(({ userId, cartId }) =>
        this.getCartConnector().pipe(
          switchMap((connector) =>
            connector.setDeliveryMode(userId, cartId, mode).pipe(
              switchMap(() => this.reloadCartAndWait(userId, cartId)),
              switchMap(() => connector.getSelectedDeliveryMode(userId, cartId))
            )
          )
        )
      )
    );
  }

  getSelectedDeliveryMode(): Observable<DeliveryMode | undefined> {
    return this.getCartContext().pipe(
      switchMap(({ userId, cartId }) =>
        this.getCartConnector().pipe(
          switchMap((connector) =>
            connector.getSelectedDeliveryMode(userId, cartId)
          )
        )
      )
    );
  }

  prepareTransactionCart(): Observable<Cart> {
    return this.createSingleProductCart().pipe(
      switchMap(() => this.handleCartGuestUser()),
      switchMap(() => this.getCurrentCart())
    );
  }

  createCartGuestUser(): Observable<boolean> {
    return this.getCartContext().pipe(
      switchMap(({ userId, cartId }) =>
        this.cartGuestUserFacade.createCartGuestUser(userId, cartId).pipe(
          tap(() => this.multiCartFacade.reloadCart(cartId)),
          map(() => true)
        )
      )
    );
  }

  protected updateCartGuestUser(
    cartGuestUser: CartGuestUser
  ): Observable<boolean> {
    return this.getCartContext().pipe(
      switchMap(({ userId, cartId }) =>
        this.cartGuestUserFacade
          .updateCartGuestUser(userId, cartId, cartGuestUser)
          .pipe(
            tap(() => this.multiCartFacade.reloadCart(cartId)),
            map(() => true)
          )
      )
    );
  }

  updateCartGuestUserEmail(email: string): Observable<boolean> {
    return this.isGuestCart().pipe(
      take(1),
      switchMap((isGuestCart) => {
        return isGuestCart && email
          ? this.updateCartGuestUser({ email })
          : of(false);
      })
    );
  }

  handleCartGuestUser(): Observable<boolean> {
    if (!this.cartId) {
      return of(true);
    }

    return combineLatest([
      this.authService.isUserLoggedIn(),
      this.isGuestCart(),
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

  createSingleProductCart(): Observable<Cart> {
    return this.getProductCodeFromRouting().pipe(
      switchMap((productCode) => this.createCartForProductCode(productCode))
    );
  }

  protected createDeliveryAddressAndReload(
    userId: string,
    cartId: string,
    address: Address
  ): Observable<string> {
    return this.getCartConnector().pipe(
      switchMap((connector) =>
        connector.createDeliveryAddress(userId, cartId, address)
      ),
      switchMap((createdAddress) =>
        this.mapReloadedCartToAddressId(userId, cartId, createdAddress)
      )
    );
  }

  protected mapReloadedCartToAddressId(
    userId: string,
    cartId: string,
    createdAddress: Address
  ): Observable<string> {
    return this.reloadCartAndWait(userId, cartId).pipe(
      map(() => createdAddress.id ?? '')
    );
  }

  protected createCartForProductCode(
    productCode: string | undefined
  ): Observable<Cart> {
    if (!productCode) {
      return throwError(() => new Error('Product code not found in routing'));
    }

    return this.singleProductCartOptions
      .getSingleProductCartOptions(productCode)
      .pipe(
        take(1),
        switchMap(({ quantity, pickupStore }) =>
          this.createCartWithProductEntry(productCode, quantity, pickupStore)
        )
      );
  }

  protected createCartWithProductEntry(
    productCode: string,
    quantity: number,
    pickupStore?: string
  ): Observable<Cart> {
    return this.userIdService.takeUserId().pipe(
      take(1),
      switchMap((userId) =>
        this.initializeCartWithEntry(
          userId,
          productCode,
          quantity,
          pickupStore
        )
      )
    );
  }

  protected initializeCartWithEntry(
    userId: string,
    productCode: string,
    quantity: number,
    pickupStore?: string
  ): Observable<Cart> {
    return this.multiCartFacade
      .createCart({
        userId,
        extraData: { active: false },
      })
      .pipe(
        // `createCart` initially replays the previously created (NEW_CREATED)
        // cart from the store. Skip it so we operate on the freshly created
        // cart instead of adding entries to the previous quick buy cart.
        filter((cart) => this.isNewlyCreatedSingleProductCart(cart, userId)),
        take(1),
        switchMap((cart) =>
          this.addProductAndWaitForStableCart(
            userId,
            cart,
            productCode,
            quantity,
            pickupStore
          )
        )
      );
  }

  protected isNewlyCreatedSingleProductCart(
    cart: Cart,
    userId: string
  ): boolean {
    return getCartIdByUserId(cart, userId) !== this.cartId;
  }

  protected addProductAndWaitForStableCart(
    userId: string,
    cart: Cart,
    productCode: string,
    quantity: number,
    pickupStore?: string
  ): Observable<Cart> {
    const cartId = getCartIdByUserId(cart, userId);
    this.userId = userId;
    this.cartId = cartId;

    this.multiCartFacade.addEntry(
      userId,
      cartId,
      productCode,
      quantity,
      pickupStore
    );

    return this.waitForStableCart(cartId).pipe(
      tap((stableCart) =>
        this.notifyIfQuantityReduced(stableCart, productCode, quantity)
      )
    );
  }

  protected getCartConnector(): Observable<OpfQuickBuyCartConnector> {
    return this.unifiedInjector.get(OpfQuickBuyCartConnector).pipe(take(1));
  }

  protected getCartContext(): Observable<{ userId: string; cartId: string }> {
    if (!this.userId || !this.cartId) {
      return throwError(
        () => new Error(SINGLE_PRODUCT_CART_NOT_INITIALIZED_ERROR)
      );
    }

    return of({ userId: this.userId, cartId: this.cartId });
  }

  protected getCart(): Observable<Cart> {
    if (!this.cartId) {
      return throwError(
        () => new Error(SINGLE_PRODUCT_CART_NOT_INITIALIZED_ERROR)
      );
    }

    return this.multiCartFacade.getCart(this.cartId).pipe(take(1));
  }

  protected isGuestCart(): Observable<boolean> {
    return this.getCart().pipe(
      switchMap((cart) => this.activeCartFacade.isGuestCart(cart))
    );
  }

  protected hasDeliveryItems(cart: Cart): boolean {
    return cart?.deliveryItemsQuantity
      ? cart?.deliveryItemsQuantity > 0
      : false;
  }

  protected getProductCodeFromRouting(): Observable<string | undefined> {
    return this.routingService.getRouterState().pipe(
      take(1),
      map((routerState) => routerState?.state?.params?.productCode)
    );
  }

  protected waitForStableCart(cartId: string): Observable<Cart> {
    return this.multiCartFacade.isStable(cartId).pipe(
      filter((stable) => stable),
      take(1),
      switchMap(() => this.multiCartFacade.getCart(cartId).pipe(take(1))),
      filter((cart): cart is Cart => !!cart)
    );
  }

  /**
   * Informs the user via a global message when the quantity actually added to
   * the single-product cart is lower than requested (e.g. due to insufficient
   * stock). Quick buy skips the standard add-to-cart dialog, so without this
   * the reduction would go unnoticed.
   */
  protected notifyIfQuantityReduced(
    cart: Cart,
    productCode: string,
    requestedQuantity: number
  ): void {
    const addedQuantity = cart.entries?.find(
      (entry) => entry.product?.code === productCode
    )?.quantity;

    if (addedQuantity != null && addedQuantity < requestedQuantity) {
      this.globalMessageService.add(
        {
          key: 'validation.lowStock',
          params: { quantity: addedQuantity },
        },
        GlobalMessageType.MSG_TYPE_WARNING
      );
    }
  }

  protected reloadCartAndWait(
    userId: string,
    cartId: string
  ): Observable<Cart> {
    return defer(() => {
      const cartReloaded$ = this.multiCartFacade.getCartEntity(cartId).pipe(
        skip(1),
        filter(
          (entity) =>
            !entity.loading && entity.processesCount === 0 && !!entity.value
        ),
        take(1),
        map((entity) => entity.value as Cart)
      );

      this.multiCartFacade.loadCart({ userId, cartId });
      return cartReloaded$;
    });
  }
}

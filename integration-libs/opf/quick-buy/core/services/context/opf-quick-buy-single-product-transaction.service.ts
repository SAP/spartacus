/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { getCartIdByUserId } from '@spartacus/cart/base/core';
import { Cart, DeliveryMode, MultiCartFacade } from '@spartacus/cart/base/root';
import {
  Address,
  RoutingService,
  UnifiedInjector,
  UserIdService,
} from '@spartacus/core';
import {
  OpfQuickBuyDeliveryInfo,
  OpfQuickBuyDeliveryType,
  OpfQuickBuySingleProductCartOptionsFacade,
} from '@spartacus/opf/quick-buy/root';
import { defer, Observable, of, throwError } from 'rxjs';
import { filter, map, skip, switchMap, take } from 'rxjs/operators';
import { OpfQuickBuyCartConnector } from '../../connectors';

@Injectable({
  providedIn: 'root',
})
export class OpfQuickBuySingleProductTransactionService {
  protected multiCartFacade = inject(MultiCartFacade);
  protected userIdService = inject(UserIdService);
  protected routingService = inject(RoutingService);
  protected unifiedInjector = inject(UnifiedInjector);
  protected singleProductCartOptions = inject(
    OpfQuickBuySingleProductCartOptionsFacade
  );

  protected userId?: string;
  protected cartId?: string;

  getTransactionDeliveryType(): Observable<OpfQuickBuyDeliveryType> {
    if (!this.cartId) {
      return throwError(
        () => new Error('Single product cart is not initialized')
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
        () => new Error('Single product cart is not initialized')
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
        this.getCartConnector().pipe(
          switchMap((connector) =>
            connector
              .createDeliveryAddress(userId, cartId, address)
              .pipe(
                switchMap((createdAddress) =>
                  this.reloadCartAndWait(userId, cartId).pipe(
                    map(() => createdAddress.id ?? '')
                  )
                )
              )
          )
        )
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
        () => new Error('Single product cart is not initialized')
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

  createSingleProductCart(): Observable<Cart> {
    return this.getProductCodeFromRouting().pipe(
      switchMap((productCode) => {
        if (!productCode) {
          return throwError(
            () => new Error('Product code not found in routing')
          );
        }

        return this.singleProductCartOptions
          .getSingleProductCartOptions(productCode)
          .pipe(
            take(1),
            switchMap(({ quantity, pickupStore }) =>
              this.userIdService.takeUserId().pipe(
                take(1),
                switchMap((userId) =>
                  this.multiCartFacade
                    .createCart({
                      userId,
                      extraData: { active: false },
                    })
                    .pipe(
                      take(1),
                      switchMap((cart) => {
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

                        return this.waitForStableCart(cartId);
                      })
                    )
                )
              )
            )
          );
      })
    );
  }

  protected getCartConnector(): Observable<OpfQuickBuyCartConnector> {
    return this.unifiedInjector.get(OpfQuickBuyCartConnector).pipe(take(1));
  }

  protected getCartContext(): Observable<{ userId: string; cartId: string }> {
    if (!this.userId || !this.cartId) {
      return throwError(
        () => new Error('Single product cart is not initialized')
      );
    }

    return of({ userId: this.userId, cartId: this.cartId });
  }

  protected getCart(): Observable<Cart> {
    if (!this.cartId) {
      return throwError(
        () => new Error('Single product cart is not initialized')
      );
    }

    return this.multiCartFacade.getCart(this.cartId).pipe(take(1));
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

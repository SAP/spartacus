/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { getCartIdByUserId } from '@spartacus/cart/base/core';
import { Cart, DeliveryMode, MultiCartFacade } from '@spartacus/cart/base/root';
import { Address, RoutingService, UserIdService } from '@spartacus/core';
import {
  OpfQuickBuyDeliveryInfo,
  OpfQuickBuyDeliveryType,
} from '@spartacus/opf/quick-buy/root';
import { Observable, of, throwError } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OpfQuickBuySingleProductTransactionService {
  protected multiCartFacade = inject(MultiCartFacade);
  protected userIdService = inject(UserIdService);
  protected routingService = inject(RoutingService);

  protected cartId?: string;
  protected selectedDeliveryMode?: DeliveryMode;

  protected getMockDeliveryModes(): DeliveryMode[] {
    return [
      {
        code: 'standard',
        name: 'Standard Delivery',
        description: 'Mocked 3-5 days',
      },
      {
        code: 'express',
        name: 'Express Delivery',
        description: 'Mocked 1-2 days',
      },
    ];
  }

  getTransactionDeliveryType(): Observable<OpfQuickBuyDeliveryType> {
    return this.getCart().pipe(
      map((cart) =>
        cart.deliveryItemsQuantity && cart.deliveryItemsQuantity > 0
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
        } as OpfQuickBuyDeliveryInfo)
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
    // @TODO: replace with Opf Quick Buy Single Product Transaction Facade with specific OCC
    return of(this.getMockDeliveryModes());
  }

  setDeliveryAddress(_address: Address): Observable<string> {
    if (!this.cartId) {
      return throwError(
        () => new Error('Single product cart is not initialized')
      );
    }

    // @TODO: replace with Opf Quick Buy Single Product Transaction Facade with specific OCC
    return this.checkStableCart().pipe(switchMap(() => of('mock-delivery-address-id')));
  }

  setBillingAddress(_address: Address): Observable<boolean> {
    if (!this.cartId) {
      return throwError(
        () => new Error('Single product cart is not initialized')
      );
    }

    // @TODO: replace with Opf Quick Buy Single Product Transaction Facade with specific OCC
    return this.checkStableCart();
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
    if (!this.cartId) {
      return throwError(
        () => new Error('Single product cart is not initialized')
      );
    }

    // @TODO: replace with Opf Quick Buy Single Product Transaction Facade with specific OCC
    this.selectedDeliveryMode =
      this.getMockDeliveryModes().find(
        (deliveryMode) => deliveryMode.code === mode
      ) ?? {
        code: mode,
        name: `Mocked ${mode}`,
        description: 'Mocked delivery mode',
      };

    return this.checkStableCart().pipe(
      map(() => this.selectedDeliveryMode)
    );
  }

  getSelectedDeliveryMode(): Observable<DeliveryMode | undefined> {
    if (!this.cartId) {
      return throwError(
        () => new Error('Single product cart is not initialized')
      );
    }

    // @TODO: replace with Opf Quick Buy Single Product Transaction Facade with specific OCC
    return of(this.selectedDeliveryMode);
  }

  createSingleProductCart(quantity = 1): Observable<Cart> {
    return this.getProductCodeFromRouting().pipe(
      switchMap((productCode) => {
        if (!productCode) {
          return throwError(
            () => new Error('Product code not found in routing')
          );
        }

        return this.userIdService.takeUserId().pipe(
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
                  this.cartId = cartId;
                  this.selectedDeliveryMode = undefined;

                  this.multiCartFacade.addEntry(
                    userId,
                    cartId,
                    productCode,
                    quantity
                  );

                  return this.waitForStableCart(cartId);
                })
              )
          )
        );
      })
    );
  }

  protected getCart(): Observable<Cart> {
    if (!this.cartId) {
      return throwError(
        () => new Error('Single product cart is not initialized')
      );
    }

    return this.multiCartFacade.getCart(this.cartId).pipe(take(1));
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
      switchMap(() => this.multiCartFacade.getCart(cartId).pipe(take(1)))
    );
  }
}

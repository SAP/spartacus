/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Cart, DeliveryMode } from '@spartacus/cart/base/root';
import { Address, BaseSiteService, RoutingService } from '@spartacus/core';
import {
  OPF_QUICK_BUY_DEFAULT_MERCHANT_NAME,
  OpfQuickBuyDeliveryInfo,
  OpfQuickBuyDeliveryType,
  OpfQuickBuyLocation,
} from '@spartacus/opf/quick-buy/root';
import { Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { OpfQuickBuyActiveCartTransactionService } from './context/opf-quick-buy-active-cart-transaction.service';
import { OpfQuickBuySingleProductTransactionService } from './context/opf-quick-buy-single-product-transaction.service';

@Injectable({
  providedIn: 'root',
})
export class OpfQuickBuyTransactionService {
  protected routingService = inject(RoutingService);
  protected baseSiteService = inject(BaseSiteService);
  protected activeCartTransactionService = inject(
    OpfQuickBuyActiveCartTransactionService
  );
  protected singleProductTransactionService = inject(
    OpfQuickBuySingleProductTransactionService
  );

  protected transactionContext?: OpfQuickBuyLocation;

  getTransactionLocationContext(): Observable<OpfQuickBuyLocation> {
    return this.routingService.getRouterState().pipe(
      take(1),
      map(
        (routerState) =>
          routerState?.state?.semanticRoute?.toLocaleUpperCase() as OpfQuickBuyLocation
      ),
      tap((context) => {
        this.transactionContext = context;
      })
    );
  }

  getMerchantName(): Observable<string> {
    return this.baseSiteService.get().pipe(
      take(1),
      map((baseSite) => baseSite?.name ?? OPF_QUICK_BUY_DEFAULT_MERCHANT_NAME)
    );
  }

  prepareTransactionCart(): Observable<Cart> {
    return this.delegate(
      () => this.singleProductTransactionService.prepareTransactionCart(),
      () => this.activeCartTransactionService.prepareTransactionCart()
    );
  }

  getTransactionDeliveryType(): Observable<OpfQuickBuyDeliveryType> {
    return this.delegate(
      () => this.singleProductTransactionService.getTransactionDeliveryType(),
      () => this.activeCartTransactionService.getTransactionDeliveryType()
    );
  }

  getTransactionDeliveryInfo(): Observable<OpfQuickBuyDeliveryInfo> {
    return this.delegate(
      () => this.singleProductTransactionService.getTransactionDeliveryInfo(),
      () => this.activeCartTransactionService.getTransactionDeliveryInfo()
    );
  }

  checkStableCart(): Observable<boolean> {
    return this.delegate(
      () => this.singleProductTransactionService.checkStableCart(),
      () => this.activeCartTransactionService.checkStableCart()
    );
  }

  getSupportedDeliveryModes(): Observable<DeliveryMode[]> {
    return this.delegate(
      () => this.singleProductTransactionService.getSupportedDeliveryModes(),
      () => this.activeCartTransactionService.getSupportedDeliveryModes()
    );
  }

  setDeliveryAddress(address: Address): Observable<string> {
    return this.delegate(
      () => this.singleProductTransactionService.setDeliveryAddress(address),
      () => this.activeCartTransactionService.setDeliveryAddress(address)
    );
  }

  setBillingAddress(address: Address): Observable<boolean> {
    return this.delegate(
      () => this.singleProductTransactionService.setBillingAddress(address),
      () => this.activeCartTransactionService.setBillingAddress(address)
    );
  }

  getDeliveryAddress(): Observable<Address | undefined> {
    return this.delegate(
      () => this.singleProductTransactionService.getDeliveryAddress(),
      () => this.activeCartTransactionService.getDeliveryAddress()
    );
  }

  getCurrentCart(): Observable<Cart> {
    return this.delegate(
      () => this.singleProductTransactionService.getCurrentCart(),
      () => this.activeCartTransactionService.getCurrentCart()
    );
  }

  getCurrentCartId(): Observable<string> {
    return this.delegate(
      () => this.singleProductTransactionService.getCurrentCartId(),
      () => this.activeCartTransactionService.getCurrentCartId()
    );
  }

  getCurrentCartTotalPrice(): Observable<number | undefined> {
    return this.delegate(
      () => this.singleProductTransactionService.getCurrentCartTotalPrice(),
      () => this.activeCartTransactionService.getCurrentCartTotalPrice()
    );
  }

  setDeliveryMode(mode: string): Observable<DeliveryMode | undefined> {
    return this.delegate(
      () => this.singleProductTransactionService.setDeliveryMode(mode),
      () => this.activeCartTransactionService.setDeliveryMode(mode)
    );
  }

  getSelectedDeliveryMode(): Observable<DeliveryMode | undefined> {
    return this.delegate(
      () => this.singleProductTransactionService.getSelectedDeliveryMode(),
      () => this.activeCartTransactionService.getSelectedDeliveryMode()
    );
  }

  deleteUserAddresses(addrIds: string[]): void {
    this.activeCartTransactionService.deleteUserAddresses(addrIds);
  }

  createCartGuestUser(): Observable<boolean> {
    return this.delegate(
      () => this.singleProductTransactionService.createCartGuestUser(),
      () => this.activeCartTransactionService.createCartGuestUser()
    );
  }

  updateCartGuestUserEmail(email: string): Observable<boolean> {
    return this.delegate(
      () => this.singleProductTransactionService.updateCartGuestUserEmail(email),
      () => this.activeCartTransactionService.updateCartGuestUserEmail(email)
    );
  }

  handleCartGuestUser(): Observable<boolean> {
    return this.delegate(
      () => this.singleProductTransactionService.handleCartGuestUser(),
      () => this.activeCartTransactionService.handleCartGuestUser()
    );
  }

  protected resolveContext(): Observable<OpfQuickBuyLocation> {
    if (this.transactionContext) {
      return of(this.transactionContext);
    }

    return this.getTransactionLocationContext();
  }

  protected isSingleProductContext(context?: OpfQuickBuyLocation): boolean {
    return context === OpfQuickBuyLocation.PRODUCT;
  }

  protected delegate<T>(
    singleProductFn: () => Observable<T>,
    activeCartFn: () => Observable<T>
  ): Observable<T> {
    return this.resolveContext().pipe(
      take(1),
      switchMap((context) =>
        this.isSingleProductContext(context)
          ? singleProductFn()
          : activeCartFn()
      )
    );
  }
}

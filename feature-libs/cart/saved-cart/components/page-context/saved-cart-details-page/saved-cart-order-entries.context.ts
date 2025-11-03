/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { ProductImportInfoService } from '@spartacus/cart/base/core';
import {
  AddOrderEntriesContext,
  Cart,
  GetOrderEntriesContext,
  MultiCartFacade,
  OrderEntriesSource,
  OrderEntry,
  ProductData,
  ProductImportInfo,
} from '@spartacus/cart/base/root';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import { RoutingService, UserIdService } from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SavedCartOrderEntriesContext
  implements AddOrderEntriesContext, GetOrderEntriesContext
{
  protected importInfoService = inject(ProductImportInfoService);
  protected userIdService = inject(UserIdService);
  protected multiCartService = inject(MultiCartFacade);
  protected savedCartService = inject(SavedCartFacade);
  protected routingService = inject(RoutingService);

  readonly type = OrderEntriesSource.SAVED_CART;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  protected savedCartId$ = this.routingService.getRouterState().pipe(
    map((routingData) => routingData.state.params.savedCartId),
    distinctUntilChanged()
  );

  addEntries(products: ProductData[]): Observable<ProductImportInfo> {
    return this.add(products).pipe(
      switchMap((cartId: string) => this.importInfoService.getResults(cartId)),
      take(products.length)
    );
  }

  getEntries(): Observable<OrderEntry[]> {
    return this.savedCartId$.pipe(
      switchMap((cartId) => this.savedCartService.get(cartId)),
      map((cart: Cart | undefined) => cart?.entries ?? ([] as OrderEntry[]))
    );
  }

  protected add(products: ProductData[]): Observable<string> {
    return combineLatest([
      this.userIdService.takeUserId(),
      this.savedCartId$,
    ]).pipe(
      tap(([userId, cartId]) =>
        this.multiCartService.addEntries(userId, cartId, products)
      ),
      map(([_userId, cartId]) => cartId)
    );
  }
}

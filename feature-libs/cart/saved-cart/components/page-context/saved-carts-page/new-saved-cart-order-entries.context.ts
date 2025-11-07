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
  MultiCartFacade,
  OrderEntriesSource,
  ProductData,
  ProductImportInfo,
  ProductImportStatus,
} from '@spartacus/cart/base/root';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import { UserIdService } from '@spartacus/core';
import { Observable, queueScheduler } from 'rxjs';
import {
  debounce,
  every,
  filter,
  map,
  observeOn,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NewSavedCartOrderEntriesContext implements AddOrderEntriesContext {
  protected importInfoService = inject(ProductImportInfoService);
  protected userIdService = inject(UserIdService);
  protected multiCartService = inject(MultiCartFacade);
  protected savedCartService = inject(SavedCartFacade);

  readonly type = OrderEntriesSource.NEW_SAVED_CART;

  addEntries(
    products: ProductData[],
    savedCartInfo?: { name: string; description: string }
  ): Observable<ProductImportInfo> {
    return this.add(products, savedCartInfo).pipe(
      tap((cartId: string) => {
        this.importInfoService
          .getResults(cartId)
          .pipe(
            take(products.length),
            every(
              (productInfo: ProductImportInfo) =>
                productInfo.statusCode ===
                  ProductImportStatus.UNKNOWN_IDENTIFIER ||
                productInfo.statusCode === ProductImportStatus.UNKNOWN_ERROR
            )
          )
          .subscribe((isInvalid: boolean) => {
            if (isInvalid) {
              this.savedCartService.deleteSavedCart(cartId);
            }
          });
      }),
      switchMap((cartId: string) => this.importInfoService.getResults(cartId)),
      take(products.length)
    );
  }

  protected add(
    products: ProductData[],
    savedCartInfo?: { name: string; description: string }
  ): Observable<string> {
    return this.userIdService.takeUserId().pipe(
      switchMap((userId: string) =>
        this.multiCartService
          .createCart({
            userId,
            extraData: { active: false },
          })
          .pipe(
            map((cart: Cart) => cart.code as string),
            tap((cartId: string) => {
              this.savedCartService.saveCart({
                cartId,
                saveCartName: savedCartInfo?.name,
                saveCartDescription: savedCartInfo?.description,
              });
              this.savedCartService.loadSavedCarts();
            }),
            observeOn(queueScheduler),
            debounce(() =>
              this.savedCartService
                .getSaveCartProcessLoading()
                .pipe(filter((loading) => !loading))
            ),
            tap((cartId: string) =>
              this.multiCartService.addEntries(userId, cartId, products)
            )
          )
      )
    );
  }
}

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ProductImportInfoService } from '@spartacus/cart/base/core';
import {
  ActiveCartFacade,
  AddEntryOptions,
  AddOrderEntriesContext,
  GetOrderEntriesContext,
  OrderEntriesSource,
  OrderEntry,
  ProductData,
  ProductImportInfo,
} from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ActiveCartOrderEntriesContext
  implements AddOrderEntriesContext, GetOrderEntriesContext
{
  readonly type = OrderEntriesSource.ACTIVE_CART;

  constructor(
    protected importInfoService: ProductImportInfoService,
    protected activeCartFacade: ActiveCartFacade
  ) {}

  addEntries(products: ProductData[]): Observable<ProductImportInfo> {
    return this.add(products).pipe(
      switchMap((cartId: string) => this.importInfoService.getResults(cartId)),
      take(products.length)
    );
  }

  getEntries(): Observable<OrderEntry[]> {
    return this.activeCartFacade.getEntries();
  }

  protected add(products: ProductData[]): Observable<string> {
    // TODO:#object-extensibility-deprecation - move to `mapProductsToOrderEntries()`
    const options: AddEntryOptions[] = products.map((product) => ({
      productCode: product.productCode,
      quantity: product.quantity,
    }));

    // TODO:#object-extensibility-deprecation - replace with this.activeCartFacade.addEntries(this.mapProductsToOrderEntries(products));
    this.activeCartFacade.addEntries(options);
    return this.activeCartFacade.getActiveCartId();
  }

  /**
   *
   * @deprecated since 5.1.0 - this method will return `AddEntryOptions[]` instead of `OrderEntry[]` in the future major version.
   */
  protected mapProductsToOrderEntries(products: ProductData[]): OrderEntry[] {
    // TODO:#object-extensibility-deprecation - will be replaced by logic from `add()` method above
    return products.map(
      (product: { productCode: string; quantity: number }) => ({
        product: { code: product.productCode },
        quantity: product.quantity,
      })
    );
  }
}

/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ProductImportInfoService } from '@spartacus/cart/base/core';
import {
  ActiveCartFacade,
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
    this.activeCartFacade.addEntries(this.mapProductsToOrderEntries(products));
    return this.activeCartFacade.getActiveCartId();
  }

  protected mapProductsToOrderEntries(products: ProductData[]): OrderEntry[] {
    return products.map(
      (product: { productCode: string; quantity: number }) => ({
        product: { code: product.productCode },
        quantity: product.quantity,
      })
    );
  }
}

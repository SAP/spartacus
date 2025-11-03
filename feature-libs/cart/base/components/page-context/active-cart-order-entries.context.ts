/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
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
  protected importInfoService = inject(ProductImportInfoService);
  protected activeCartFacade = inject(ActiveCartFacade);

  readonly type = OrderEntriesSource.ACTIVE_CART;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

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

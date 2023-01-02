/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { merge, Observable, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  mergeAll,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import {
  AddOrderEntriesContext,
  GetOrderEntriesContext,
  OrderEntriesSource,
  OrderEntry,
  ProductData,
  ProductImportInfo,
  ProductImportStatus,
} from '@spartacus/cart/base/root';
import { QuickOrderFacade } from '@spartacus/cart/quick-order/root';
import { Product, ProductConnector } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class QuickOrderOrderEntriesContext
  implements AddOrderEntriesContext, GetOrderEntriesContext
{
  readonly type = OrderEntriesSource.QUICK_ORDER;

  constructor(
    protected quickOrderService: QuickOrderFacade,
    protected productConnector: ProductConnector
  ) {}

  getEntries(): Observable<OrderEntry[]> {
    return this.quickOrderService.getEntries();
  }

  addEntries(productsData: ProductData[]): Observable<ProductImportInfo> {
    return merge(
      productsData.map((productData) =>
        this.quickOrderService.canAdd(productData.productCode).pipe(
          switchMap((canAdd) => {
            if (canAdd) {
              return this.productConnector.get(productData.productCode).pipe(
                filter((product) => !!product),
                tap((product) => {
                  this.quickOrderService.addProduct(
                    product,
                    productData.quantity
                  );
                }),
                map((product) => this.handleResults(product, productData)),
                catchError((response: HttpErrorResponse) => {
                  return of(
                    this.handleErrors(response, productData.productCode)
                  );
                })
              );
            } else {
              return of({
                productCode: productData.productCode,
                statusCode: ProductImportStatus.LIMIT_EXCEEDED,
              });
            }
          })
        )
      )
    ).pipe(mergeAll(), take(productsData.length));
  }

  protected handleResults(
    product: Product,
    productData: ProductData
  ): ProductImportInfo {
    if (
      product.stock?.stockLevel &&
      productData.quantity > product.stock.stockLevel
    ) {
      return {
        productCode: productData.productCode,
        productName: product?.name,
        statusCode: ProductImportStatus.LOW_STOCK,
        quantity: productData.quantity,
        quantityAdded: product.stock.stockLevel,
      };
    } else if (product.stock?.stockLevelStatus === 'outOfStock') {
      return {
        productCode: productData.productCode,
        statusCode: ProductImportStatus.NO_STOCK,
        productName: product?.name,
      };
    } else {
      return {
        productCode: productData.productCode,
        statusCode: ProductImportStatus.SUCCESS,
      };
    }
  }

  protected handleErrors(
    response: HttpErrorResponse,
    productCode: string
  ): ProductImportInfo {
    if (response?.error?.errors[0].type === 'UnknownIdentifierError') {
      return {
        productCode,
        statusCode: ProductImportStatus.UNKNOWN_IDENTIFIER,
      };
    } else {
      if (isDevMode()) {
        console.warn(
          'Unrecognized cart add entry action type while mapping messages',
          response
        );
      }
      return {
        productCode,
        statusCode: ProductImportStatus.UNKNOWN_ERROR,
      };
    }
  }
}

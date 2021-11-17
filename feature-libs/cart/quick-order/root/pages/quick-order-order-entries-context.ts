import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { merge, Observable, of } from 'rxjs';
import {
  catchError,
  // concatAll,
  filter,
  map,
  mergeAll,
  // switchAll,
  switchMap,
  take,
} from 'rxjs/operators';
import { OrderEntry, Product, ProductConnector } from '@spartacus/core';
import {
  OrderEntriesSource,
  GetOrderEntriesContext,
  AddOrderEntriesContext,
  ProductData,
  ProductImportInfo,
  ProductImportStatus,
} from '@spartacus/storefront';
import { QuickOrderFacade } from '../facade/quick-order.facade';

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
        this.productConnector.get(productData.productCode).pipe(
          filter((product) => !!product),
          switchMap((product: Product) =>
            this.quickOrderService.canAdd(product.code).pipe(
              map((canAdd: boolean) => {
                const productData = productsData.find(
                  (p) => p.productCode === product.code
                ) as ProductData;
                if (canAdd) {
                  this.quickOrderService.addProduct(
                    product,
                    productData.quantity
                  );
                  return this.handleResults(product, productData);
                } else {
                  return {
                    productCode: productData.productCode,
                    statusCode: ProductImportStatus.LIMIT_EXCEEDED,
                  };
                }
              })
            )
          ),
          catchError((response: HttpErrorResponse) => {
            return of(this.handleErrors(response, productData.productCode));
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
      productData.quantity >= product.stock.stockLevel
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

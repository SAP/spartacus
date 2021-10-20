import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { OrderEntry, Product, ProductAdapter } from '@spartacus/core';
import { QuickOrderFacade } from '@spartacus/cart/quick-order/root';
import { catchError, take, tap } from 'rxjs/operators';
import { CartTypes } from '../model/import-export.model';
import {
  ProductData,
  ProductImportInfo,
  ProductImportStatus,
} from '../model/import-to-cart.model';
import { ImportExportContext } from './import-export.context';

@Injectable({
  providedIn: 'root',
})
export class QuickOrderImportExportContext implements ImportExportContext {
  readonly type = CartTypes.QUICK_ORDER;

  constructor(
    protected quickOrderService: QuickOrderFacade,
    protected productAdapter: ProductAdapter
  ) {}

  getEntries(): Observable<OrderEntry[]> {
    return this.quickOrderService.getEntries();
  }

  addEntries(products: ProductData[]): Observable<ProductImportInfo> {
    const results$ = new Subject<ProductImportInfo>();

    products.forEach((productData) => {
      this.productAdapter
        .load(productData.productCode)
        .pipe(
          take(1),
          tap((product: Product) => {
            this.handleResults(product, productData, results$);
            this.quickOrderService.addProduct(product, productData.quantity);
          }),
          catchError((response: HttpErrorResponse) => {
            this.handleErrors(response, productData.productCode, results$);
            return of(response);
          })
        )
        .subscribe();
    });
    return results$.pipe(take(products.length));
  }

  protected handleResults(
    product: Product,
    productData: ProductData,
    results$: Subject<ProductImportInfo>
  ) {
    if (
      product.stock?.stockLevel &&
      productData.quantity >= product.stock.stockLevel
    ) {
      results$.next({
        productCode: productData.productCode,
        productName: product?.name,
        statusCode: ProductImportStatus.LOW_STOCK,
        quantity: productData.quantity,
        quantityAdded: product.stock.stockLevel,
      });
    } else if (product.stock?.stockLevelStatus === 'outOfStock') {
      results$.next({
        productCode: productData.productCode,
        statusCode: ProductImportStatus.NO_STOCK,
        productName: product?.name,
      });
    } else {
      results$.next({
        productCode: productData.productCode,
        statusCode: ProductImportStatus.SUCCESS,
      });
    }
  }

  protected handleErrors(
    response: HttpErrorResponse,
    productCode: string,
    results$: Subject<ProductImportInfo>
  ) {
    if (response?.error?.errors[0].type === 'UnknownIdentifierError') {
      results$.next({
        productCode,
        statusCode: ProductImportStatus.UNKNOWN_IDENTIFIER,
      });
    } else {
      if (isDevMode()) {
        console.warn(
          'Unrecognized cart add entry action type while mapping messages',
          response
        );
      }
      results$.next({
        productCode,
        statusCode: ProductImportStatus.UNKNOWN_ERROR,
      });
    }
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { forkJoin, from, Observable, of, Subject } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { OrderEntry, Product, ProductConnector } from '@spartacus/core';
import { QuickOrderFacade } from '@spartacus/cart/quick-order/root';
import { CartTypes } from '../model/import-export.model';
import {
  ProductData,
  ProductImportInfo,
  ProductImportStatus,
} from '../model/import-to-cart.model';
import { ImportContext } from './import.context';
import { ExportContext } from './export.context';

@Injectable({
  providedIn: 'root',
})
export class QuickOrderImportExportContext
  implements ImportContext, ExportContext
{
  readonly type = CartTypes.QUICK_ORDER;

  constructor(
    protected quickOrderService: QuickOrderFacade,
    protected productConnector: ProductConnector
  ) {}

  getEntries(): Observable<OrderEntry[]> {
    return this.quickOrderService.getEntries();
  }

  addEntries(productsData: ProductData[]): Observable<ProductImportInfo> {
    const results$ = new Subject<ProductImportInfo>();

    forkJoin(
      productsData.map((productData) =>
        this.productConnector.get(productData.productCode).pipe(
          take(1),
          catchError((response: HttpErrorResponse) => {
            this.handleErrors(response, productData.productCode, results$);
            return of(null);
          })
        )
      )
    )
      .pipe(
        switchMap((products) =>
          from(products).pipe(
            filter((product) => !!product),
            switchMap((product: Product) =>
              this.quickOrderService.getLimitExceeded().pipe(
                take(1),
                tap((limitExceeded: boolean) => {
                  const productData = productsData.find(
                    (p) => p.productCode === product.code
                  ) as ProductData;
                  if (limitExceeded) {
                    results$.next({
                      productCode: productData.productCode,
                      statusCode: ProductImportStatus.LIMIT_EXCEEDED,
                    });
                  } else {
                    this.handleResults(product, productData, results$);
                    this.quickOrderService.addProduct(
                      product,
                      productData.quantity
                    );
                  }
                })
              )
            )
          )
        )
      )
      .subscribe();
    return results$.pipe(take(productsData.length));
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

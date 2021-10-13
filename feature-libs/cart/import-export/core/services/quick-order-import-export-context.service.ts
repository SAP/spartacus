import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { forkJoin, from, Observable, of, Subject } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import { OrderEntry, Product, ProductAdapter } from '@spartacus/core';
import { QuickOrderFacade } from '@spartacus/cart/quick-order/root';
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

  results$ = new Subject<ProductImportInfo>();

  getEntries(): Observable<OrderEntry[]> {
    return this.quickOrderService.getEntries();
  }

  addEntries(products: ProductData[]): Observable<ProductImportInfo> {
    forkJoin(
      products.map((productData) =>
        this.productAdapter.load(productData.productCode).pipe(take(1))
      )
    )
      .pipe(
        switchMap((_products) =>
          from(_products).pipe(
            switchMap((product: Product) =>
              this.quickOrderService.getEntries().pipe(
                take(1),
                tap((entries: OrderEntry[]) => {
                  const _productData = products.find(
                    (p) => p.productCode === product.code
                  ) as ProductData;
                  if (entries.length < 10) {
                    this.handleResults(product, _productData);
                    this.quickOrderService.addProduct(
                      product,
                      _productData.quantity
                    );
                  } else {
                    this.results$.next({
                      productCode: _productData.productCode,
                      statusCode: ProductImportStatus.LIMIT_EXCEED,
                    });
                  }
                }),
                catchError((response: HttpErrorResponse) => {
                  this.handleErrors(response, product.code as string);
                  return of(response);
                })
              )
            )
          )
        )
      )
      .subscribe();
    return this.results$.pipe(take(products.length));
  }

  protected handleResults(product: Product, productData: ProductData) {
    if (
      product.stock?.stockLevel &&
      productData.quantity >= product.stock.stockLevel
    ) {
      this.results$.next({
        productCode: productData.productCode,
        productName: product?.name,
        statusCode: ProductImportStatus.LOW_STOCK,
        quantity: productData.quantity,
        quantityAdded: product.stock.stockLevel,
      });
    } else if (product.stock?.stockLevelStatus === 'outOfStock') {
      this.results$.next({
        productCode: productData.productCode,
        statusCode: ProductImportStatus.NO_STOCK,
        productName: product?.name,
      });
    } else {
      this.results$.next({
        productCode: productData.productCode,
        statusCode: ProductImportStatus.SUCCESS,
      });
    }
  }

  protected handleErrors(response: HttpErrorResponse, productCode: string) {
    if (response?.error?.errors[0].type === 'UnknownIdentifierError') {
      this.results$.next({
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
      this.results$.next({
        productCode,
        statusCode: ProductImportStatus.UNKNOWN_ERROR,
      });
    }
  }
}

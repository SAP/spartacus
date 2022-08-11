import { Injectable } from '@angular/core';
import {
  isNotUndefined,
  Product,
  ProductScope,
  ProductService,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CurrentProductService {
  constructor(
    private routingService: RoutingService,
    private productService: ProductService
  ) {}

  protected readonly DEFAULT_PRODUCT_SCOPE = ProductScope.DETAILS;

  /**
   * Returns an observable for the current product
   * @returns Product
   * @returns null if product can't be found
   *
   * @param scopes
   */
  getProduct(
    scopes?: (ProductScope | string)[] | ProductScope | string
  ): Observable<Product | null> {
    return this.getCode().pipe(
      distinctUntilChanged(),
      switchMap((productCode: string) => {
        return productCode
          ? this.productService.get(
              productCode,
              scopes || this.DEFAULT_PRODUCT_SCOPE
            )
          : of(null);
      }),
      filter(isNotUndefined)
    );
  }

  protected getCode(): Observable<string> {
    return this.routingService
      .getRouterState()
      .pipe(map((state) => state.state.params['productCode']));
  }
}

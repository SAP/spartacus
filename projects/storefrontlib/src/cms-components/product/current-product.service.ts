import { Injectable } from '@angular/core';
import {
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
   * Will emit current product or null, if there is no current product (i.e. we are not on PDP)
   *
   * @param scopes
   */
  getProduct(
    scopes?: (ProductScope | string)[] | ProductScope | string
  ): Observable<Product | null> {
    return this.routingService.getRouterState().pipe(
      map((state) => state.state.params['productCode']),
      distinctUntilChanged(),
      switchMap((productCode: string) => {
        return productCode
          ? this.productService.get(
              productCode,
              scopes || this.DEFAULT_PRODUCT_SCOPE
            )
          : of(null);
      }),
      filter((x) => x !== undefined),
      distinctUntilChanged()
    );
  }
}

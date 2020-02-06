import { Injectable } from '@angular/core';
import {
  FeatureConfigService,
  Product,
  ProductScope,
  ProductService,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CurrentProductService {
  constructor(
    routingService: RoutingService,
    productService: ProductService,
    // tslint:disable-next-line: unified-signatures
    features?: FeatureConfigService
  );

  /**
   * @deprecated since 1.4
   */
  constructor(routingService: RoutingService, productService: ProductService);

  constructor(
    private routingService: RoutingService,
    private productService: ProductService,
    protected features?: FeatureConfigService
  ) {}

  protected readonly DEFAULT_PRODUCT_SCOPE =
    this.features && this.features.isLevel('1.4') ? ProductScope.DETAILS : '';

  getProduct(
    scopes?: (ProductScope | string)[] | ProductScope | string
  ): Observable<Product> {
    return this.routingService.getRouterState().pipe(
      map(state => state.state.params['productCode']),
      filter(Boolean),
      switchMap((productCode: string) =>
        this.productService.get(
          productCode,
          // TODO deprecated since 1.4 - should be replaced with 'scopes || this.DEFAULT_PRODUCT_SCOPE'
          this.features && this.features.isLevel('1.4')
            ? scopes || this.DEFAULT_PRODUCT_SCOPE
            : undefined
          // deprecated END
        )
      )
    );
  }
}

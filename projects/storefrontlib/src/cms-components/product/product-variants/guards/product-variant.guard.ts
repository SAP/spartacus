import { CanActivate, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  VariantOption,
  ProductService,
  Product,
  RoutingService,
  ProductScope,
} from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class ProductVariantGuard implements CanActivate {
  constructor(
    private productService: ProductService,
    private routingService: RoutingService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.routingService.getRouterState().pipe(
      map(state => state.nextState.params.productCode),
      switchMap((productCode: string) => {
        if (productCode) {
          return this.productService.get(productCode, ProductScope.VARIANTS);
        } else {
          return of(undefined);
        }
      }),
      map((product: Product) => {
        if (product && !product.purchasable) {
          const variant = this.findVariant(product.variantOptions);
          this.routingService.go({
            cxRoute: 'product',
            params: { code: variant.code, name: product.name },
          });
          return false;
        } else {
          return true;
        }
      })
    );
  }

  findVariant(variants: VariantOption[]): VariantOption {
    const results: VariantOption[] = variants.filter(variant => {
      return variant.stock && variant.stock.stockLevel ? variant : false;
    });
    return !results.length && variants.length ? variants[0] : results[0];
  }
}

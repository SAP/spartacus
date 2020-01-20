import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
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
      filter(Boolean),
      switchMap((productCode: string) =>
        this.productService.get(productCode, ProductScope.VARIANTS)
      ),
      filter(Boolean),
      map((product: Product) => {
        if (!product.purchasable) {
          const variant = this.findVariant(product.variantOptions);
          this.routingService.goByUrl(`product/${variant.code}`);
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

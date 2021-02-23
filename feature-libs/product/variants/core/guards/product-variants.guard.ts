import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import {
  Product,
  ProductScope,
  ProductService,
  SemanticPathService,
  VariantOption,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductVariantsGuard implements CanActivate {
  constructor(
    protected productService: ProductService,
    protected semanticPathService: SemanticPathService,
    protected router: Router
  ) {}

  canActivate(
    activatedRoute: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> {
    const productCode = activatedRoute.params?.productCode;
    if (!productCode) {
      return of(true);
    }

    return this.productService.get(productCode, ProductScope.VARIANTS).pipe(
      switchMap((product: Product) => {
        if (product && !product.purchasable) {
          const variant = this.findVariant(product.variantOptions);
          if (variant && variant.code) {
            return this.productService
              .get(variant.code, ProductScope.LIST)
              .pipe(
                filter((p) => Boolean(p)),
                take(1),
                map((_product: Product) => {
                  return this.router.createUrlTree(
                    this.semanticPathService.transform({
                      cxRoute: 'product',
                      params: _product,
                    })
                  );
                })
              );
          } else {
            return of(true);
          }
        } else {
          return of(true);
        }
      })
    );
  }

  findVariant(
    variants: VariantOption[] | undefined
  ): VariantOption | undefined {
    if (!variants) {
      return;
    } else {
      const results: VariantOption[] = variants.filter((variant) => {
        return variant.stock && variant.stock.stockLevel ? variant : false;
      });
      return !results.length && variants.length ? variants[0] : results[0];
    }
  }
}

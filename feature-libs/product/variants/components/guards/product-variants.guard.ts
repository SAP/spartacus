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
/**
 * Guard that will redirect to purchasable variant of product, if the navigation
 * is for the non-purchasable one
 */
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
      filter((p) => !!p),
      switchMap((product: Product) => {
        if (!product.purchasable) {
          const purchasableCode = this.findPurchasableProductCode(product);
          if (purchasableCode) {
            return this.productService
              .get(purchasableCode, ProductScope.LIST)
              .pipe(
                filter((p) => !!p),
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
          }
        }
        return of(true);
      })
    );
  }
  /**
   * Finds a purchasable product code looking at variant options, if any
   *
   * @param product
   */
  protected findPurchasableProductCode(product: Product): string | undefined {
    if (product.variantOptions?.length) {
      const results: VariantOption[] = product.variantOptions.filter(
        (variant) => {
          return variant.stock && variant.stock.stockLevel ? variant : false;
        }
      );
      return results && results.length
        ? results[0]?.code
        : product.variantOptions[0]?.code;
    }
    return undefined;
  }
}

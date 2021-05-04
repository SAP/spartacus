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
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VariantsMultiDimensionalGuard implements CanActivate {
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
        if (!product.purchasable && product.variantMatrix?.length) {
          return of(
            this.router.createUrlTree(
              this.semanticPathService.transform({
                cxRoute: 'product',
                params: {
                  code: product.variantMatrix[0].variantOption?.code,
                  name: product.name,
                },
              })
            )
          );
        } else {
          return of(true);
        }
      })
    );
  }
}

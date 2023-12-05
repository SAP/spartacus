import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Product, ProductService, SemanticPathService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Guard that will redirect to purchasable variant of product, if the navigation
 * is for the non-purchasable one
 */
export declare class ProductVariantsGuard implements CanActivate {
    protected productService: ProductService;
    protected semanticPathService: SemanticPathService;
    protected router: Router;
    constructor(productService: ProductService, semanticPathService: SemanticPathService, router: Router);
    canActivate(activatedRoute: ActivatedRouteSnapshot): Observable<boolean | UrlTree>;
    /**
     * Finds a purchasable product code looking at variant options, if any
     *
     * @param product
     */
    protected findPurchasableProductCode(product: Product): string | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductVariantsGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProductVariantsGuard>;
}

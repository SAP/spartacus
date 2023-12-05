import { Product, ProductScope, ProductService, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CurrentProductService {
    private routingService;
    private productService;
    constructor(routingService: RoutingService, productService: ProductService);
    protected readonly DEFAULT_PRODUCT_SCOPE = ProductScope.DETAILS;
    /**
     * Returns an observable for the current product
     * @returns Product
     * @returns null if product can't be found
     *
     * @param scopes
     */
    getProduct(scopes?: (ProductScope | string)[] | ProductScope | string): Observable<Product | null>;
    protected getCode(): Observable<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CurrentProductService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CurrentProductService>;
}

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../model/product.model';
import { ProductScope } from '../model/product-scope';
import { ProductLoadingService } from '../services/product-loading.service';
import { StateWithProduct } from '../store/product-state';
import * as i0 from "@angular/core";
export declare class ProductService {
    protected store: Store<StateWithProduct>;
    protected productLoading: ProductLoadingService;
    constructor(store: Store<StateWithProduct>, productLoading: ProductLoadingService);
    /**
     * Returns the product observable. The product will be loaded
     * whenever there's no value observed.
     *
     * The underlying product loader ensures that the product is
     * only loaded once, even in case of parallel observers.
     *
     * You should provide product data scope you are interested in to not load all
     * the data if not needed. You can provide more than one scope.
     *
     * @param productCode Product code to load
     * @param scopes Scope or scopes of the product data
     */
    get(productCode: string, scopes?: (ProductScope | string)[] | ProductScope | string): Observable<Product | undefined>;
    /**
     * Returns boolean observable for product's loading state
     */
    isLoading(productCode: string, scope?: ProductScope | string): Observable<boolean>;
    /**
     * Returns boolean observable for product's load success state
     */
    isSuccess(productCode: string, scope?: ProductScope | string): Observable<boolean>;
    /**
     * Returns boolean observable for product's load error state
     */
    hasError(productCode: string, scope?: ProductScope | string): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProductService>;
}

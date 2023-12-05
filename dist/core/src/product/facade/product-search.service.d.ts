import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductSearchPage } from '../../model/product-search.model';
import { SearchConfig } from '../model/search-config';
import { StateWithProduct } from '../store/product-state';
import * as i0 from "@angular/core";
export declare class ProductSearchService {
    protected store: Store<StateWithProduct>;
    constructor(store: Store<StateWithProduct>);
    search(query: string | undefined, searchConfig?: SearchConfig): void;
    getResults(): Observable<ProductSearchPage>;
    clearResults(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductSearchService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProductSearchService>;
}

import { ProductSearchAdapter } from './product-search.adapter';
import { SearchConfig } from '../../model/search-config';
import { Observable } from 'rxjs';
import { Suggestion, ProductSearchPage } from '../../../model/product-search.model';
import * as i0 from "@angular/core";
export declare class ProductSearchConnector {
    protected adapter: ProductSearchAdapter;
    constructor(adapter: ProductSearchAdapter);
    search(query: string, searchConfig?: SearchConfig): Observable<ProductSearchPage>;
    getSuggestions(term: string, pageSize?: number): Observable<Suggestion[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductSearchConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProductSearchConnector>;
}

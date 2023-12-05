import { Observable } from 'rxjs';
import { ProductSearchPage, Suggestion } from '../../model/index';
import { SearchConfig } from '../model/index';
import { ProductSearchService } from './product-search.service';
import * as i0 from "@angular/core";
export declare class SearchboxService extends ProductSearchService {
    /**
     * dispatch the search for the search box
     */
    search(query: string, searchConfig?: SearchConfig): void;
    getResults(): Observable<ProductSearchPage>;
    /**
     * clears the products and suggestions
     */
    clearResults(): void;
    getSuggestionResults(): Observable<Suggestion[]>;
    searchSuggestions(query: string, searchConfig?: SearchConfig): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchboxService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SearchboxService>;
}

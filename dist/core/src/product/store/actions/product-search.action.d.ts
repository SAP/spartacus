import { Action } from '@ngrx/store';
import { ErrorModel } from '../../../model/misc.model';
import { ClearSearch, ProductSearchPage, Suggestion } from '../../../model/product-search.model';
import { SearchConfig } from '../../model/search-config';
export declare const SEARCH_PRODUCTS = "[Product] Search Products";
export declare const SEARCH_PRODUCTS_FAIL = "[Product] Search Products Fail";
export declare const SEARCH_PRODUCTS_SUCCESS = "[Product] Search Products Success";
export declare const GET_PRODUCT_SUGGESTIONS = "[Product] Get Product Suggestions";
export declare const GET_PRODUCT_SUGGESTIONS_SUCCESS = "[Product] Get Product Suggestions Success";
export declare const GET_PRODUCT_SUGGESTIONS_FAIL = "[Product] Get Product Suggestions Fail";
export declare const CLEAR_PRODUCT_SEARCH_RESULT = "[Product] Clear Product Search Result";
export declare class SearchProducts implements Action {
    payload: {
        queryText: string;
        searchConfig?: SearchConfig;
    };
    auxiliary?: boolean | undefined;
    readonly type = "[Product] Search Products";
    constructor(payload: {
        queryText: string;
        searchConfig?: SearchConfig;
    }, auxiliary?: boolean | undefined);
}
export declare class SearchProductsFail implements Action {
    payload: ErrorModel | undefined;
    auxiliary?: boolean | undefined;
    readonly type = "[Product] Search Products Fail";
    constructor(payload: ErrorModel | undefined, auxiliary?: boolean | undefined);
}
export declare class SearchProductsSuccess implements Action {
    payload: ProductSearchPage;
    auxiliary?: boolean | undefined;
    readonly type = "[Product] Search Products Success";
    constructor(payload: ProductSearchPage, auxiliary?: boolean | undefined);
}
export declare class GetProductSuggestions implements Action {
    payload: {
        term: string;
        searchConfig?: SearchConfig;
    };
    readonly type = "[Product] Get Product Suggestions";
    constructor(payload: {
        term: string;
        searchConfig?: SearchConfig;
    });
}
export declare class GetProductSuggestionsSuccess implements Action {
    payload: Suggestion[];
    readonly type = "[Product] Get Product Suggestions Success";
    constructor(payload: Suggestion[]);
}
export declare class GetProductSuggestionsFail implements Action {
    payload: ErrorModel | undefined;
    readonly type = "[Product] Get Product Suggestions Fail";
    constructor(payload: ErrorModel | undefined);
}
export declare class ClearProductSearchResult implements Action {
    payload: ClearSearch;
    readonly type = "[Product] Clear Product Search Result";
    constructor(payload?: ClearSearch);
}
export type ProductSearchAction = SearchProducts | SearchProductsFail | SearchProductsSuccess | GetProductSuggestions | GetProductSuggestionsSuccess | GetProductSuggestionsFail | ClearProductSearchResult;

import { ProductSearchPage, Suggestion } from '../../../model/product-search.model';
import { ProductActions } from '../actions/index';
import { ProductsSearchState } from '../product-state';
export declare const initialState: ProductsSearchState;
export declare function reducer(state: ProductsSearchState | undefined, action: ProductActions.ProductSearchAction): ProductsSearchState;
export declare const getSearchResults: (state: ProductsSearchState) => ProductSearchPage;
export declare const getAuxSearchResults: (state: ProductsSearchState) => ProductSearchPage;
export declare const getProductSuggestions: (state: ProductsSearchState) => Suggestion[];

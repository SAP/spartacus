import { MemoizedSelector } from '@ngrx/store';
import { ProductSearchPage, Suggestion } from '../../../model/product-search.model';
import { ProductsSearchState, StateWithProduct } from '../product-state';
export declare const getProductsSearchState: MemoizedSelector<StateWithProduct, ProductsSearchState>;
export declare const getSearchResults: MemoizedSelector<StateWithProduct, ProductSearchPage>;
export declare const getAuxSearchResults: MemoizedSelector<StateWithProduct, ProductSearchPage>;
export declare const getProductSuggestions: MemoizedSelector<StateWithProduct, Suggestion[]>;

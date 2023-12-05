import { ProductSearchPage, Suggestion } from '../../model/product-search.model';
import { Product, ProductReference, Review } from '../../model/product.model';
import { EntityScopedLoaderState } from '../../state/utils/scoped-loader/scoped-loader.state';
export declare const PRODUCT_FEATURE = "product";
export declare const PRODUCT_DETAIL_ENTITY = "[Product] Detail Entity";
export interface StateWithProduct {
    [PRODUCT_FEATURE]: ProductsState;
}
export interface ProductsState {
    details: EntityScopedLoaderState<Product>;
    search: ProductsSearchState;
    reviews: ProductReviewsState;
    references: ProductReferencesState;
}
export interface ProductsSearchState {
    results: ProductSearchPage;
    suggestions: Suggestion[];
    auxResults: ProductSearchPage;
}
export interface ProductReviewsState {
    productCode: string;
    list: Review[];
}
export interface ProductReferencesState {
    productCode: string;
    list: ProductReference[];
}

import { ProductReference } from '../../../model/product.model';
import { ProductActions } from '../actions/index';
import { ProductReferencesState } from '../product-state';
export declare const initialState: ProductReferencesState;
export declare function reducer(state: ProductReferencesState | undefined, action: ProductActions.ProductReferencesAction): ProductReferencesState;
export declare const getProductReferenceList: (state: ProductReferencesState) => ProductReference[];
export declare const getProductReferenceProductCode: (state: ProductReferencesState) => string;

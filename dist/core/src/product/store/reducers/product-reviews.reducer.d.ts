import { Review } from '../../../model/product.model';
import { ProductActions } from '../actions/index';
import { ProductReviewsState } from '../product-state';
export declare const initialState: ProductReviewsState;
export declare function reducer(state: ProductReviewsState | undefined, action: ProductActions.ProductReviewsAction): ProductReviewsState;
export declare const getReviewList: (state: ProductReviewsState) => Review[];
export declare const getReviewProductCode: (state: ProductReviewsState) => string;

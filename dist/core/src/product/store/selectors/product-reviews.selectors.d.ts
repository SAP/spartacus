import { MemoizedSelector } from '@ngrx/store';
import { Review } from '../../../model/product.model';
import { ProductReviewsState, StateWithProduct } from '../product-state';
export declare const getProductReviewsState: MemoizedSelector<StateWithProduct, ProductReviewsState>;
export declare const getSelectedProductReviewsFactory: (productCode: string) => MemoizedSelector<StateWithProduct, Review[] | undefined>;

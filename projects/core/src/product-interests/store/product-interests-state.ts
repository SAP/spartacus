import { LoaderState } from '../../state';
import { ProductInterestList } from '../model/product-interest.model';

export const PRODUCT_INTERESTS_FEATURE = 'product interests';
export const PRODUCT_INTERESTS = 'Product Interests';
export const DELETE_BACK_IN_STOCK_PROCESS_ID = 'deleteBackInStock';
export const CREATE_BACK_IN_STOCK_PROCESS_ID = 'createBackInStock';

export interface StateWithProductInterests {
  [PRODUCT_INTERESTS_FEATURE]: ProductInterestsState;
}

export interface ProductInterestsState {
  interests: LoaderState<ProductInterestList>;
  backInStock: boolean;
}

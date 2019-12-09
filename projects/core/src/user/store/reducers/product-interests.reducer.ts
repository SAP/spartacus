import { UserActions } from '../actions/index';
import { ProductInterestSearchResult } from '../../../model/product-interest.model';

export const initialState: ProductInterestSearchResult = {
  results: [],
  pagination: {},
  sorts: [],
};

export function reducer(
  state = initialState,
  action: UserActions.ProductInterestsAction
): ProductInterestSearchResult {
  switch (action.type) {
    case UserActions.LOAD_PRODUCT_INTERESTS_SUCCESS: {
      return action.payload ? action.payload : initialState;
    }
    case UserActions.LOAD_PRODUCT_INTERESTS_FAIL: {
      return initialState;
    }
  }
  return state;
}

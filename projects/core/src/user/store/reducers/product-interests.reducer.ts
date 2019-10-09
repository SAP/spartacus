import { UserActions } from '../actions/index';
import { ProductInterestList } from '../../../model/product-interest.model';

export const initialState: ProductInterestList = {
  results: [],
  pagination: {},
  sorts: [],
};

export function reducer(
  state = initialState,
  action: UserActions.ProductInterestsAction
): ProductInterestList {
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

import * as fromInterestsAction from '../actions/product-interests.actions';
import { ProductInterestList } from '../../model/product-interest.model';

export const initialState: ProductInterestList = {
  results: [],
  pagination: {},
  sorts: [],
};

export function reducer(
  state = initialState,
  action: fromInterestsAction.ProductInterestsAction
): ProductInterestList {
  switch (action.type) {
    case fromInterestsAction.LOAD_PRODUCT_INTERESTS_SUCCESS: {
      return action.payload ? action.payload : initialState;
    }
    case fromInterestsAction.LOAD_PRODUCT_INTERESTS_FAIL: {
      return initialState;
    }
  }

  return state;
}

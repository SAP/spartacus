import * as fromInterestsReducer from './product-interests.reducer';
import { UserActions } from '../actions/index';
import { ProductInterestSearchResult } from '../../../model/product-interest.model';

describe('Product Interests Reducer', () => {
  describe('Undefined Action', () => {
    it('should returen the default state', () => {
      const { initialState } = fromInterestsReducer;
      const action = {} as UserActions.ProductInterestsAction;

      const state = fromInterestsReducer.reducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });
  describe('LOAD_PRODUCT_INTERESTS_SUCCESS action', () => {
    it('should populate the user addresses state entities', () => {
      const interests: ProductInterestSearchResult = {
        results: [],
        sorts: [],
        pagination: {},
      };
      const { initialState } = fromInterestsReducer;
      const action = new UserActions.LoadProductInterestsSuccess(interests);

      const state = fromInterestsReducer.reducer(initialState, action);
      expect(state).toEqual(interests);
    });
  });

  describe('LOAD_PRODUCT_INTERESTS_FAIL action', () => {
    it('should return the initial state', () => {
      const { initialState } = fromInterestsReducer;
      const action = new UserActions.LoadProductInterestsFail({});
      const state = fromInterestsReducer.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });
});

import * as fromInterestsAction from '../actions/product-interests.actions';
import * as fromInterestsReducer from './product-interests.reducer';
import { ProductInterestList } from '../../model/product-interest.model';

describe('Product Interests Reducer', () => {
  describe('Undefined Action', () => {
    it('should returen the default state', () => {
      const { initialState } = fromInterestsReducer;
      const action = {} as fromInterestsAction.ProductInterestsAction;

      const state = fromInterestsReducer.reducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });
  describe('LOAD_PRODUCT_INTERESTS_SUCCESS action', () => {
    it('should populate the user addresses state entities', () => {
      const interests: ProductInterestList = {
        results: [],
        sorts: [],
        pagination: {},
      };
      const { initialState } = fromInterestsReducer;
      const action = new fromInterestsAction.LoadProductInterestsSuccess(
        interests
      );

      const state = fromInterestsReducer.reducer(initialState, action);
      expect(state).toEqual(interests);
    });
  });

  describe('LOAD_PRODUCT_INTERESTS_FAIL action', () => {
    it('should return the initial state', () => {
      const { initialState } = fromInterestsReducer;
      const action = new fromInterestsAction.LoadProductInterestsFail({});
      const state = fromInterestsReducer.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });
});

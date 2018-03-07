import * as fromReducer from './../reducers/product-reviews.reducer';
import * as fromActions from './../actions/product-reviews.action';

describe('Product Reviews reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {} as any;
      const state = fromReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_PRODUCT_REVIEWS_SUCCESS', () => {
    it('should populate product reviews', () => {
      const productCode = '123';
      const reviews = [
        {
          id: 1,
          rating: 3
        },
        {
          id: 2,
          rating: 5
        }
      ];

      const { initialState } = fromReducer;
      const action = new fromActions.LoadProductReviewsSuccess({
        productCode,
        list: reviews
      });
      const state = fromReducer.reducer(initialState, action);
      expect(state.productCode).toBe(productCode);
      expect(state.list).toBe(reviews);
    });
  });
});

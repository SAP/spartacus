import * as fromActions from './product-reviews.action';

describe('Product Review Actions', () => {
  describe('LoadProductReview Actions', () => {
    describe('LOAD_PRODUCT_REVIEWS', () => {
      it('should create the action', () => {
        const productCode = 'testCode';
        const action = new fromActions.LoadProductReviews(productCode);
        expect({ ...action }).toEqual({
          type: fromActions.LOAD_PRODUCT_REVIEWS,
          payload: productCode
        });
      });
    });

    describe('LOAD_PRODUCT_REVIEWS_FAIL', () => {
      it('should create the action', () => {
        const payload = { message: 'Load Error' };
        const action = new fromActions.LoadProductReviewsFail(payload);
        expect({ ...action }).toEqual({
          type: fromActions.LOAD_PRODUCT_REVIEWS_FAIL,
          payload
        });
      });
    });

    describe('LOAD_PRODUCT_REVIEWS_SUCCESS', () => {
      it('should create the action', () => {
        const payload = {
          reviews: [
            {
              id: 1,
              rating: 3
            },
            {
              id: 2,
              rating: 5
            }
          ]
        };
        const action = new fromActions.LoadProductReviewsSuccess(payload);
        expect({ ...action }).toEqual({
          type: fromActions.LOAD_PRODUCT_REVIEWS_SUCCESS,
          payload
        });
      });
    });
  });
});

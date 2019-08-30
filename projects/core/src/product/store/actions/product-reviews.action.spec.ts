import { ErrorModel } from '../../../model/misc.model';
import { Occ } from '../../../occ/occ-models/occ.models';
import { ProductActions } from './index';

describe('Product Review Actions', () => {
  describe('LoadProductReview Actions', () => {
    describe('LOAD_PRODUCT_REVIEWS', () => {
      it('should create the action', () => {
        const productCode = 'testCode';
        const action = new ProductActions.LoadProductReviews(productCode);
        expect({ ...action }).toEqual({
          type: ProductActions.LOAD_PRODUCT_REVIEWS,
          payload: productCode,
        });
      });
    });

    describe('LOAD_PRODUCT_REVIEWS_FAIL', () => {
      it('should create the action', () => {
        const payload: ErrorModel = { message: 'Load Error' };
        const action = new ProductActions.LoadProductReviewsFail(payload);
        expect({ ...action }).toEqual({
          type: ProductActions.LOAD_PRODUCT_REVIEWS_FAIL,
          payload,
        });
      });
    });

    describe('LOAD_PRODUCT_REVIEWS_SUCCESS', () => {
      it('should create the action', () => {
        const productCode = '123';
        const list: Occ.ReviewList = {
          reviews: [
            {
              id: '1',
              rating: 3,
            },
            {
              id: '2',
              rating: 5,
            },
          ],
        };

        const action = new ProductActions.LoadProductReviewsSuccess({
          productCode,
          list: list.reviews,
        });
        expect({ ...action }).toEqual({
          type: ProductActions.LOAD_PRODUCT_REVIEWS_SUCCESS,
          payload: { productCode, list: list.reviews },
        });
      });
    });
  });
});

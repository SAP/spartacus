import { PRODUCT_INTERESTS } from '../../../user/store/user-state';
import * as fromInterestsAction from './product-interests.actions';
import {
  loadMeta,
  failMeta,
  successMeta,
} from '../../../state/utils/loader/loader.action';

const userId = 'jack.ma@hybris.com';

describe('Product Interests Actions', () => {
  describe('LoadProductInterests Actions', () => {
    it('should be able to create the action', () => {
      const payload = {
        userId: userId,
        pageSize: 1,
        currentPage: 0,
        sort: 'name:asc',
      };
      const action = new fromInterestsAction.LoadProductInterests(payload);
      expect({ ...action }).toEqual({
        type: fromInterestsAction.LOAD_PRODUCT_INTERESTS,
        payload: payload,
        meta: loadMeta(PRODUCT_INTERESTS),
      });
    });
  });
  describe('LoadProductInterestsFail Actions', () => {
    it('should be able to create the action', () => {
      const error = 'error';
      const action = new fromInterestsAction.LoadProductInterestsFail(error);
      expect({ ...action }).toEqual({
        type: fromInterestsAction.LOAD_PRODUCT_INTERESTS_FAIL,
        payload: error,
        meta: failMeta(error, PRODUCT_INTERESTS),
      });
    });
  });

  describe('LoadProductInterestsSuccess Actions', () => {
    it('should be able to create the action', () => {
      const payload = {
        results: [],
        sorts: [],
        pagination: {},
      };
      const action = new fromInterestsAction.LoadProductInterestsSuccess(
        payload
      );
      expect({ ...action }).toEqual({
        type: fromInterestsAction.LOAD_PRODUCT_INTERESTS_SUCCESS,
        payload: payload,
        meta: successMeta(PRODUCT_INTERESTS),
      });
    });
  });

  describe('DeleteProductInterests Actions', () => {
    it('should be able to create the action', () => {
      const payload = {
        userId: userId,
        item: {},
      };
      const action = new fromInterestsAction.DeleteProductInterests(payload);
      expect({ ...action }).toEqual({
        type: fromInterestsAction.DELETE_PRODUCT_INTERESTS,
        payload: payload,
        meta: loadMeta(PRODUCT_INTERESTS),
      });
    });
  });

  describe('DeleteProductInterestsSuccess Actions', () => {
    it('should be able to create the action', () => {
      const payload = 'del success';
      const action = new fromInterestsAction.DeleteProductInterestsSuccess(
        payload
      );
      expect({ ...action }).toEqual({
        type: fromInterestsAction.DELETE_PRODUCT_INTERESTS_SUCCESS,
        payload: payload,
        meta: successMeta(PRODUCT_INTERESTS),
      });
    });
  });

  describe('DeleteProductInterestsFail Actions', () => {
    it('should be able to create the action', () => {
      const error = 'del fail';
      const action = new fromInterestsAction.DeleteProductInterestsFail(error);
      expect({ ...action }).toEqual({
        type: fromInterestsAction.DELETE_PRODUCT_INTERESTS_FAIL,
        payload: error,
        meta: failMeta(PRODUCT_INTERESTS, error),
      });
    });
  });

  describe('ClearProductInterests Actions', () => {
    it('should be able to create the action', () => {
      const action = new fromInterestsAction.ClearProductInterests();
      expect({ ...action }).toEqual({
        type: fromInterestsAction.CLEAR_PRODUCT_INTERESTS,
      });
    });
  });
});

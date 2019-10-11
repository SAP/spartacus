import { PRODUCT_INTERESTS } from '../user-state';
import { UserActions } from './index';
import {
  loadMeta,
  failMeta,
  successMeta,
} from '../../../state/utils/loader/loader.action';

const userId = 'jack.ma@hybris.com';

fdescribe('Product Interests Actions', () => {
  describe('LoadProductInterests Actions', () => {
    it('should be able to create the action', () => {
      const payload = {
        userId: userId,
        pageSize: 1,
        currentPage: 0,
        sort: 'name:asc',
      };
      const action = new UserActions.LoadProductInterests(payload);
      expect({ ...action }).toEqual({
        type: UserActions.LOAD_PRODUCT_INTERESTS,
        payload: payload,
        meta: loadMeta(PRODUCT_INTERESTS),
      });
    });
  });
  describe('LoadProductInterestsFail Actions', () => {
    it('should be able to create the action', () => {
      const error = 'error';
      const action = new UserActions.LoadProductInterestsFail(error);
      expect({ ...action }).toEqual({
        type: UserActions.LOAD_PRODUCT_INTERESTS_FAIL,
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
      const action = new UserActions.LoadProductInterestsSuccess(payload);
      expect({ ...action }).toEqual({
        type: UserActions.LOAD_PRODUCT_INTERESTS_SUCCESS,
        payload: payload,
        meta: successMeta(PRODUCT_INTERESTS),
      });
    });
  });

  // describe('DeleteProductInterests Actions', () => {
  //   it('should be able to create the action', () => {
  //     const payload = {
  //       userId: userId,
  //       item: {},
  //     };
  //     const action = new UserActions.RemoveProductInterests(payload);
  //     expect({ ...action }).toEqual({
  //       type: UserActions.REMOVE_PRODUCT_INTERESTS,
  //       payload: payload,
  //       meta: loadMeta(PRODUCT_INTERESTS),
  //     });
  //   });
  // });

  // describe('DeleteProductInterestsSuccess Actions', () => {
  //   it('should be able to create the action', () => {
  //     const payload = 'del success';
  //     const action = new UserActions.RemoveProductInterestsSuccess(payload);
  //     expect({ ...action }).toEqual({
  //       type: UserActions.REMOVE_PRODUCT_INTERESTS_SUCCESS,
  //       payload: payload,
  //       meta: successMeta(PRODUCT_INTERESTS),
  //     });
  //   });
  // });

  // describe('DeleteProductInterestsFail Actions', () => {
  //   it('should be able to create the action', () => {
  //     const error = 'del fail';
  //     const action = new UserActions.RemoveProductInterestsFail(error);
  //     expect({ ...action }).toEqual({
  //       type: UserActions.REMOVE_PRODUCT_INTERESTS_FAIL,
  //       payload: error,
  //       meta: failMeta(PRODUCT_INTERESTS, error),
  //     });
  //   });
  // });

  // describe('ClearProductInterests Actions', () => {
  //   it('should be able to create the action', () => {
  //     const action = new UserActions.ClearProductInterests();
  //     expect({ ...action }).toEqual({
  //       type: UserActions.CLEAR_PRODUCT_INTERESTS,
  //       meta: failMeta(PRODUCT_INTERESTS),
  //     });
  //   });
  // });
});

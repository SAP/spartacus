import {
  PRODUCT_INTERESTS,
  REMOVE_PRODUCT_INTERESTS_PROCESS_ID,
  ADD_PRODUCT_INTEREST_PROCESS_ID,
} from '../user-state';
import { UserActions } from './index';
import {
  loadMeta,
  failMeta,
  successMeta,
  resetMeta,
} from '../../../state/utils/loader/loader.action';
import { NotificationType } from '../../../model/product-interest.model';
import {
  entityLoadMeta,
  entitySuccessMeta,
  entityFailMeta,
  entityResetMeta,
} from '../../../state/utils/entity-loader/entity-loader.action';
import { PROCESS_FEATURE } from '../../../process/store/process-state';

const userId = 'qingyu@sap.com';
const productCode = '343898';

describe('Product Interests Actions', () => {
  describe('LoadProductInterests Actions', () => {
    it('should be able to create the action', () => {
      const payload = {
        userId: userId,
        pageSize: 1,
        currentPage: 0,
        sort: 'name:asc',
        productCode: productCode,
        notificationType: NotificationType.BACK_IN_STOCK,
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
        meta: failMeta(PRODUCT_INTERESTS, error),
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

  describe('RemoveProductInterests Actions', () => {
    it('should be able to create the action', () => {
      const payload = {
        userId: userId,
        item: {},
        singleDelete: true,
      };
      const action = new UserActions.RemoveProductInterest(payload);
      expect({ ...action }).toEqual({
        type: UserActions.REMOVE_PRODUCT_INTEREST,
        payload: payload,
        meta: entityLoadMeta(
          PROCESS_FEATURE,
          REMOVE_PRODUCT_INTERESTS_PROCESS_ID
        ),
      });
    });
  });

  describe('RemoveProductInterestsSuccess Actions', () => {
    it('should be able to create the action', () => {
      const payload = 'remove success';
      const action = new UserActions.RemoveProductInterestSuccess(payload);
      expect({ ...action }).toEqual({
        type: UserActions.REMOVE_PRODUCT_INTEREST_SUCCESS,
        payload: payload,
        meta: entitySuccessMeta(
          PROCESS_FEATURE,
          REMOVE_PRODUCT_INTERESTS_PROCESS_ID
        ),
      });
    });
  });

  describe('RemoveProductInterestsFail Actions', () => {
    it('should be able to create the action', () => {
      const error = 'remove fail';
      const action = new UserActions.RemoveProductInterestFail(error);
      expect({ ...action }).toEqual({
        type: UserActions.REMOVE_PRODUCT_INTEREST_FAIL,
        payload: error,
        meta: entityFailMeta(
          PROCESS_FEATURE,
          REMOVE_PRODUCT_INTERESTS_PROCESS_ID,
          error
        ),
      });
    });
  });

  describe('AddProductInterest Action', () => {
    it('should be able to create the action', () => {
      const payload = {
        userId: userId,
        productCode: '858687',
        notificationType: NotificationType.BACK_IN_STOCK,
      };
      const action = new UserActions.AddProductInterest(payload);
      expect({ ...action }).toEqual({
        type: UserActions.ADD_PRODUCT_INTEREST,
        payload: payload,
        meta: entityLoadMeta(PROCESS_FEATURE, ADD_PRODUCT_INTEREST_PROCESS_ID),
      });
    });
  });

  describe('AddProductInterestSuccess Action', () => {
    it('should be able to create the action', () => {
      const payload = 'add success';
      const action = new UserActions.AddProductInterestSuccess(payload);
      expect({ ...action }).toEqual({
        type: UserActions.ADD_PRODUCT_INTEREST_SUCCESS,
        payload: payload,
        meta: entitySuccessMeta(
          PROCESS_FEATURE,
          ADD_PRODUCT_INTEREST_PROCESS_ID
        ),
      });
    });
  });

  describe('AddProductInterestFail Action', () => {
    it('should be able to create the action', () => {
      const error = 'add fail';
      const action = new UserActions.AddProductInterestFail(error);
      expect({ ...action }).toEqual({
        type: UserActions.ADD_PRODUCT_INTEREST_FAIL,
        payload: error,
        meta: entityFailMeta(
          PROCESS_FEATURE,
          ADD_PRODUCT_INTEREST_PROCESS_ID,
          error
        ),
      });
    });
  });

  describe('ResetRemoveInterestState Action', () => {
    it('should be able to create the action', () => {
      const action = new UserActions.ResetRemoveInterestState();
      expect({ ...action }).toEqual({
        type: UserActions.REMOVE_PRODUCT_INTEREST_RESET,
        meta: entityResetMeta(
          PROCESS_FEATURE,
          REMOVE_PRODUCT_INTERESTS_PROCESS_ID
        ),
      });
    });
  });

  describe('ResetAddInterestState Action', () => {
    it('should be able to create the action', () => {
      const action = new UserActions.ResetAddInterestState();
      expect({ ...action }).toEqual({
        type: UserActions.ADD_PRODUCT_INTEREST_RESET,
        meta: entityResetMeta(PROCESS_FEATURE, ADD_PRODUCT_INTEREST_PROCESS_ID),
      });
    });
  });

  describe('ClearProductInterests Actions', () => {
    it('should be able to create the action', () => {
      const action = new UserActions.ClearProductInterests();
      expect({ ...action }).toEqual({
        type: UserActions.CLEAR_PRODUCT_INTERESTS,
        meta: resetMeta(PRODUCT_INTERESTS),
      });
    });
  });
});

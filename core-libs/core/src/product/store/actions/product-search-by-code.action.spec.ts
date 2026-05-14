import { StateUtils } from '@spartacus/core';
import { EntityScopedLoaderActions } from '../../../state/utils/scoped-loader/entity-scoped-loader.actions';
import { PRODUCT_SEARCH_RESULTS_BY_CODES_ENTITY } from '../product-state';
import * as fromProductSearchByCode from './product-search-by-code.action';

describe('ProductSearchLoadByCode Actions', () => {
  describe('ProductSearchLoadByCode', () => {
    it('should create an action', () => {
      const payload = { code: 'testCode', scope: 'testScope' };
      const action = new fromProductSearchByCode.ProductSearchLoadByCode(
        payload
      );
      expect({ ...action }).toEqual({
        type: fromProductSearchByCode.PRODUCT_SEARCH_LOAD_BY_CODE,
        payload: payload,
        meta: EntityScopedLoaderActions.entityScopedLoadMeta(
          PRODUCT_SEARCH_RESULTS_BY_CODES_ENTITY,
          payload.code,
          payload.scope
        ),
      });
    });
  });

  describe('ProductSearchLoadByCodeSuccess', () => {
    it('should create an action', () => {
      const payload = {
        product: { code: 'testCode' },
        code: 'testCode',
        scope: 'testScope',
      };
      const action = new fromProductSearchByCode.ProductSearchLoadByCodeSuccess(
        payload
      );
      expect({ ...action }).toEqual({
        type: fromProductSearchByCode.PRODUCT_SEARCH_LOAD_BY_CODE_SUCCESS,
        payload: payload.product,
        meta: EntityScopedLoaderActions.entityScopedSuccessMeta(
          PRODUCT_SEARCH_RESULTS_BY_CODES_ENTITY,
          payload.code,
          payload.scope
        ),
      });
    });
  });

  describe('ProductSearchLoadByCodeFail', () => {
    it('should create an action', () => {
      const payload = {
        code: 'testCode',
        scope: 'testScope',
        error: 'someError',
      };
      const action = new fromProductSearchByCode.ProductSearchLoadByCodeFail(
        payload
      );
      expect({ ...action }).toEqual({
        type: fromProductSearchByCode.PRODUCT_SEARCH_LOAD_BY_CODE_FAIL,
        meta: EntityScopedLoaderActions.entityScopedFailMeta(
          PRODUCT_SEARCH_RESULTS_BY_CODES_ENTITY,
          payload.code,
          payload.scope,
          payload.error
        ),
        error: payload.error,
      });
    });
  });

  describe('ClearProductSearchByCodeState', () => {
    it('should create an action', () => {
      const action =
        new fromProductSearchByCode.ClearProductSearchByCodeState();
      expect({ ...action }).toEqual({
        type: fromProductSearchByCode.CLEAR_PRODUCT_SEARCH_BY_CODE_STATE,
        meta: StateUtils.entityRemoveAllMeta(
          PRODUCT_SEARCH_RESULTS_BY_CODES_ENTITY
        ),
      });
    });
  });
});

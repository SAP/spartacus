import { EntityScopedLoaderActions } from '../../../state/utils/scoped-loader/entity-scoped-loader.actions';
import { PRODUCT_SEARCH_RESULTS_BY_CATEGORY_ENTITY } from '../product-state';
import * as fromProductSearchByCategory from './product-search-by-category.action';

describe('ProductSearchByCategory Actions', () => {
  describe('ProductSearchLoadByCategory', () => {
    it('should create an action', () => {
      const payload = { categoryCode: 'testCategory', scope: 'testScope' };
      const action =
        new fromProductSearchByCategory.ProductSearchLoadByCategory(payload);

      expect({ ...action }).toEqual({
        type: fromProductSearchByCategory.PRODUCT_SEARCH_LOAD_BY_CATEGORY,
        payload: payload,
        meta: EntityScopedLoaderActions.entityScopedLoadMeta(
          PRODUCT_SEARCH_RESULTS_BY_CATEGORY_ENTITY,
          payload.categoryCode,
          payload.scope
        ),
      });
    });
  });

  describe('ProductSearchLoadByCategorySuccess', () => {
    it('should create an action', () => {
      const payload = {
        categoryCode: 'testCategory',
        scope: 'testScope',
        products: [{ code: 'product1' }, { code: 'product2' }],
      };
      const action =
        new fromProductSearchByCategory.ProductSearchLoadByCategorySuccess(
          payload
        );

      expect({ ...action }).toEqual({
        type: fromProductSearchByCategory.PRODUCT_SEARCH_LOAD_BY_CATEGORY_SUCCESS,
        payload: payload.products,
        meta: EntityScopedLoaderActions.entityScopedSuccessMeta(
          PRODUCT_SEARCH_RESULTS_BY_CATEGORY_ENTITY,
          payload.categoryCode,
          payload.scope
        ),
      });
    });
  });

  describe('ProductSearchLoadByCategoryFail', () => {
    it('should create an action', () => {
      const payload = {
        categoryCode: 'testCategory',
        scope: 'testScope',
        error: 'someError',
      };
      const action =
        new fromProductSearchByCategory.ProductSearchLoadByCategoryFail(
          payload
        );

      expect({ ...action }).toEqual({
        type: fromProductSearchByCategory.PRODUCT_SEARCH_LOAD_BY_CATEGORY_FAIL,
        meta: EntityScopedLoaderActions.entityScopedFailMeta(
          PRODUCT_SEARCH_RESULTS_BY_CATEGORY_ENTITY,
          payload.categoryCode,
          payload.scope,
          payload.error
        ),
        error: payload.error,
      });
    });
  });
});

import { scopedLoaderReducer } from './scoped-loader.reducer';
import { loaderReducer } from '../loader/loader.reducer';
import { LoaderLoadAction } from '../loader/loader.action';

describe('scopedLoaderReducer', () => {
  const TEST_ENTITY_TYPE = 'test';

  describe('with scope should target sub state', () => {
    it('loader action', () => {
      const action: any = new LoaderLoadAction(TEST_ENTITY_TYPE);
      const scope = 'testScope';
      action.meta.scope = scope;
      const state = scopedLoaderReducer(TEST_ENTITY_TYPE)(undefined, action);
      const expected = loaderReducer(TEST_ENTITY_TYPE)(undefined, action);
      expect(state[scope]).toEqual(expected);
    });

    it('should use empty scope if no scope is provided', () => {
      const action: any = new LoaderLoadAction(TEST_ENTITY_TYPE);
      const state = scopedLoaderReducer(TEST_ENTITY_TYPE)(undefined, action);
      const expected = loaderReducer(TEST_ENTITY_TYPE)(undefined, action);
      expect(state['']).toEqual(expected);
    });
  });
});

import { scopedLoaderReducer } from './scoped-loader.reducer';
import { loaderReducer } from '../loader/loader.reducer';
import { Action } from '@ngrx/store';
import { LoaderLoadAction } from '../loader/loader.action';

describe('scopedLoaderReducer', () => {
  const TEST_ENTITY_TYPE = 'test';

  describe('without scope should proxy to loader reducer', () => {
    it('undefined action', () => {
      const action = {} as Action;
      const state = scopedLoaderReducer(TEST_ENTITY_TYPE)(undefined, action);
      const expected = loaderReducer(TEST_ENTITY_TYPE)(undefined, action);
      expect(state).toEqual(expected);
    });

    it('undefined action with subReducer', () => {
      const subReducer = (s = 'default', _action: Action) => s;
      const action = {} as Action;
      const state = scopedLoaderReducer(TEST_ENTITY_TYPE, subReducer)(
        undefined,
        action
      );
      const expected = loaderReducer(TEST_ENTITY_TYPE, subReducer)(
        undefined,
        action
      );
      expect(state).toEqual(expected);
    });

    it('loader action', () => {
      const action: any = new LoaderLoadAction(TEST_ENTITY_TYPE);
      const state = scopedLoaderReducer(TEST_ENTITY_TYPE)(undefined, action);
      const expected = loaderReducer(TEST_ENTITY_TYPE)(undefined, action);
      expect(state).toEqual(expected);
    });
  });

  describe('with scope should target sub state', () => {
    it('loader action', () => {
      const action: any = new LoaderLoadAction(TEST_ENTITY_TYPE);
      const scope = 'testScope';
      action.meta.scope = scope;
      const state = scopedLoaderReducer(TEST_ENTITY_TYPE)(undefined, action);
      const expected = loaderReducer(TEST_ENTITY_TYPE)(undefined, action);
      expect(state[scope]).toEqual(expected);
    });
  });
});

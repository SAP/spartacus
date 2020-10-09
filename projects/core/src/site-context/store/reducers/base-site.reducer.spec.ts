import { BaseSite } from '../../../model/misc.model';
import { SiteContextActions } from '../actions/index';
import * as fromBaseSite from './base-site.reducer';

describe('BaseSite Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromBaseSite;
      const action = {} as SiteContextActions.BaseSiteAction;
      const state = fromBaseSite.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('SET_ACTIVE_BASE_SITE action', () => {
    it('should set active baseSite', () => {
      const { initialState } = fromBaseSite;
      const action = new SiteContextActions.SetActiveBaseSite('base-site');
      const state = fromBaseSite.reducer(initialState, action);

      expect(state.activeSite).toEqual('base-site');
    });
  });

  describe('LOAD_BASE_SITES_SUCCESS action', () => {
    it('should populate all baseSite data', () => {
      const payload: BaseSite[] = [
        {
          uid: 'test',
          defaultPreviewCategoryCode: 'test category code',
          defaultPreviewProductCode: 'test product code',
        },
      ];

      const entities: { [key: string]: BaseSite } = {
        test: payload[0],
      };

      const { initialState } = fromBaseSite;
      const action = new SiteContextActions.LoadBaseSitesSuccess(payload);
      const state = fromBaseSite.reducer(initialState, action);

      expect(state.entities).toEqual(entities);
    });
  });
});

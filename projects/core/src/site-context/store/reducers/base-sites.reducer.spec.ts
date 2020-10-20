import { BaseSite } from '../../../model/misc.model';
import { SiteContextActions } from '../actions/index';
import * as fromBaseSites from './base-sites.reducer';

describe('BaseSites Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromBaseSites;
      const action = {} as SiteContextActions.BaseSitesAction;
      const state = fromBaseSites.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('SET_ACTIVE_BASE_SITE action', () => {
    it('should set active baseSite', () => {
      const { initialState } = fromBaseSites;
      const action = new SiteContextActions.SetActiveBaseSite('base-site');
      const state = fromBaseSites.reducer(initialState, action);

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

      const { initialState } = fromBaseSites;
      const action = new SiteContextActions.LoadBaseSitesSuccess(payload);
      const state = fromBaseSites.reducer(initialState, action);

      expect(state.entities).toEqual(entities);
    });
  });
});

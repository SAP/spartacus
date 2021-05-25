import { BaseSite } from '../../../model/misc.model';
import { SiteContextActions } from '../actions/index';
import * as fromBaseSite from './base-site.reducer';

const baseSite: BaseSite = {
  uid: 'test',
  defaultPreviewCategoryCode: 'test category code',
  defaultPreviewProductCode: 'test product code',
};
const baseSites: BaseSite[] = [baseSite];

const entities: { [key: string]: BaseSite } = {
  test: baseSite,
};

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

      const state1 = fromBaseSite.reducer(
        initialState,
        new SiteContextActions.LoadBaseSitesSuccess(baseSites)
      );
      const state2 = fromBaseSite.reducer(
        state1,
        new SiteContextActions.SetActiveBaseSite('test')
      );

      expect(state2.activeSite).toEqual('test');
      expect(state2.details).toEqual(baseSite);
    });
  });

  describe('LOAD_BASE_SITE_SUCCESS action', () => {
    it('should populate the active baseSite data', () => {
      const { initialState } = fromBaseSite;
      const action = new SiteContextActions.LoadBaseSiteSuccess(baseSite);
      const state = fromBaseSite.reducer(initialState, action);

      expect(state.details).toEqual(baseSite);
    });
  });

  describe('LOAD_BASE_SITES_SUCCESS action', () => {
    it('should populate all baseSite data', () => {
      const { initialState } = fromBaseSite;
      const state1 = fromBaseSite.reducer(
        initialState,
        new SiteContextActions.SetActiveBaseSite('test')
      );
      const state2 = fromBaseSite.reducer(
        state1,
        new SiteContextActions.LoadBaseSitesSuccess(baseSites)
      );

      expect(state2.entities).toEqual(entities);
      expect(state2.details).toEqual(baseSite);
    });
  });
});

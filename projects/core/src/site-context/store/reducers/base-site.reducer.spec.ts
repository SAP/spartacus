import * as fromBaseSite from './base-site.reducer';
import { BaseSiteAction, SetActiveBaseSite } from '@spartacus/core';
import { LoadBaseSiteSuccess } from '../actions';
import { BaseSite } from '../../../model/misc.model';

describe('BaseSite Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromBaseSite;
      const action = {} as BaseSiteAction;
      const state = fromBaseSite.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('SET_ACTIVE_BASE_SITE action', () => {
    it('should set active baseSite', () => {
      const { initialState } = fromBaseSite;
      const action = new SetActiveBaseSite('base-site');
      const state = fromBaseSite.reducer(initialState, action);

      expect(state.activeSite).toEqual('base-site');
    });
  });

  describe('LOAD_BASE_SITE_SUCCESS action', () => {
    it('should populate the active baseSite data', () => {
      const payload: BaseSite = {
        uid: 'test',
        defaultPreviewCategoryCode: 'test category code',
        defaultPreviewProductCode: 'test product code',
      };
      const { initialState } = fromBaseSite;
      const action = new LoadBaseSiteSuccess(payload);
      const state = fromBaseSite.reducer(initialState, action);

      expect(state.details).toEqual(payload);
    });
  });
});

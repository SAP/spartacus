import * as fromBaseSite from './base-site.reducer';
import { BaseSiteAction, SetActiveBaseSite } from '@spartacus/core';

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

      expect(state).toEqual('base-site');
    });
  });
});

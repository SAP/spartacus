/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserActions } from '../actions/index';
import * as fromReducer from './districts.reducer';

describe('Districts Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {} as UserActions.DistrictsAction;
      const state = fromReducer.reducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_DISTRICTS_SUCCESS action', () => {
    const cityIsocode = 'CN-1101';
    const mockDistricts = [
      { isocode: 'CN-110101', name: 'Dongcheng' },
      { isocode: 'CN-110102', name: 'Xicheng' },
    ];

    it('should populate the districts entities', () => {
      const { initialState } = fromReducer;
      const action = new UserActions.LoadDistrictsSuccess({
        entities: mockDistricts,
        cityIsocode,
      });
      const state = fromReducer.reducer(initialState, action);
      expect(state.entities).toEqual(mockDistricts);
      expect(state.cityIsocode).toEqual(cityIsocode);
    });
  });
});

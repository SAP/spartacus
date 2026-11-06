/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserActions } from '../actions/index';
import * as fromReducer from './cities.reducer';

describe('Cities Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {} as UserActions.CitiesAction;
      const state = fromReducer.reducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_CITIES_SUCCESS action', () => {
    const regionIsocode = 'CN-11';
    const mockCities = [
      { isocode: 'CN-1101', name: 'Beijing' },
      { isocode: 'CN-1102', name: 'Tianjin' },
    ];

    it('should populate the cities entities', () => {
      const { initialState } = fromReducer;
      const action = new UserActions.LoadCitiesSuccess({
        entities: mockCities,
        regionIsocode,
      });
      const state = fromReducer.reducer(initialState, action);
      expect(state.entities).toEqual(mockCities);
      expect(state.regionIsocode).toEqual(regionIsocode);
    });
  });
});

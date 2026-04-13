/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { StateUtils } from '../../../state/utils/index';
import { CITIES } from '../user-state';
import { UserActions } from './index';

const regionIsocode = 'CN-11';

describe('Cities Actions', () => {
  describe('LoadCities', () => {
    it('should create the action', () => {
      const action = new UserActions.LoadCities(regionIsocode);
      expect({ ...action }).toEqual({
        type: UserActions.LOAD_CITIES,
        payload: regionIsocode,
        meta: StateUtils.loadMeta(CITIES),
      });
    });
  });

  describe('LoadCitiesFail', () => {
    it('should create the action', () => {
      const error = new Error('anError');
      const action = new UserActions.LoadCitiesFail(error);
      expect({ ...action }).toEqual({
        type: UserActions.LOAD_CITIES_FAIL,
        payload: error,
        error,
        meta: StateUtils.failMeta(CITIES, error),
      });
    });
  });

  describe('LoadCitiesSuccess', () => {
    it('should create the action', () => {
      const cities = [
        { isocode: 'CN-1101', name: 'Beijing' },
        { isocode: 'CN-1102', name: 'Tianjin' },
      ];
      const action = new UserActions.LoadCitiesSuccess({
        entities: cities,
        regionIsocode,
      });
      expect({ ...action }).toEqual({
        type: UserActions.LOAD_CITIES_SUCCESS,
        payload: { entities: cities, regionIsocode },
        meta: StateUtils.successMeta(CITIES),
      });
    });
  });

  describe('ClearCities', () => {
    it('should create the action', () => {
      const action = new UserActions.ClearCities();
      expect({ ...action }).toEqual({
        type: UserActions.CLEAR_CITIES,
      });
    });
  });
});

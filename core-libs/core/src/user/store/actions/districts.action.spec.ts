/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { StateUtils } from '../../../state/utils/index';
import { DISTRICTS } from '../user-state';
import { UserActions } from './index';

const cityIsocode = 'CN-1101';

describe('Districts Actions', () => {
  describe('LoadDistricts', () => {
    it('should create the action', () => {
      const action = new UserActions.LoadDistricts(cityIsocode);
      expect({ ...action }).toEqual({
        type: UserActions.LOAD_DISTRICTS,
        payload: cityIsocode,
        meta: StateUtils.loadMeta(DISTRICTS),
      });
    });
  });

  describe('LoadDistrictsFail', () => {
    it('should create the action', () => {
      const error = new Error('anError');
      const action = new UserActions.LoadDistrictsFail(error);
      expect({ ...action }).toEqual({
        type: UserActions.LOAD_DISTRICTS_FAIL,
        payload: error,
        error,
        meta: StateUtils.failMeta(DISTRICTS, error),
      });
    });
  });

  describe('LoadDistrictsSuccess', () => {
    it('should create the action', () => {
      const districts = [
        { isocode: 'CN-110101', name: 'Dongcheng' },
        { isocode: 'CN-110102', name: 'Xicheng' },
      ];
      const action = new UserActions.LoadDistrictsSuccess({
        entities: districts,
        cityIsocode,
      });
      expect({ ...action }).toEqual({
        type: UserActions.LOAD_DISTRICTS_SUCCESS,
        payload: { entities: districts, cityIsocode },
        meta: StateUtils.successMeta(DISTRICTS),
      });
    });
  });

  describe('ClearDistricts', () => {
    it('should create the action', () => {
      const action = new UserActions.ClearDistricts();
      expect({ ...action }).toEqual({
        type: UserActions.CLEAR_DISTRICTS,
      });
    });
  });
});

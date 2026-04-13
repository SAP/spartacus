/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserActions } from '../actions/index';
import { DistrictsState } from '../user-state';

export const initialState: DistrictsState = {
  entities: [],
  cityIsocode: null,
};

export function reducer(
  state = initialState,
  action: UserActions.DistrictsAction | UserActions.ClearUserMiscsData
): DistrictsState {
  switch (action.type) {
    case UserActions.LOAD_DISTRICTS_SUCCESS: {
      const entities = action.payload.entities;
      const cityIsocode = action.payload.cityIsocode;
      if (entities || cityIsocode) {
        return {
          ...state,
          entities,
          cityIsocode,
        };
      }
      return initialState;
    }
  }

  return state;
}

/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserActions } from '../actions/index';
import { CitiesState } from '../user-state';

export const initialState: CitiesState = {
  entities: [],
  regionIsocode: null,
};

export function reducer(
  state = initialState,
  action: UserActions.CitiesAction | UserActions.ClearUserMiscsData
): CitiesState {
  if (action.type === UserActions.LOAD_CITIES_SUCCESS) {
    const { entities, regionIsocode } = action.payload;
    if (entities || regionIsocode) {
      return {
        ...state,
        entities,
        regionIsocode,
      };
    }
    return initialState;
  }

  return state;
}

/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { BundleActions } from '../actions/index';
import { AvailableEntriesState } from '../bundle-state';

export const initialState: AvailableEntriesState = {
  availableEntriesEntities: {},
};

export function availableEntriesReducer(
  state = initialState,
  action: BundleActions.CartBundleAction
): AvailableEntriesState {
  switch (action.type) {
    case BundleActions.GET_BUNDLE_ALLOWED_PRODUCTS_SUCCESS: {
      const availableEntriesEntities = action.payload;
      return {
        ...state,
        availableEntriesEntities: {
          ...availableEntriesEntities
        },
      };
    }
  }
  return state;
}

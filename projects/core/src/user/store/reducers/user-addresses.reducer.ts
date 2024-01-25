/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Address } from '../../../model/address.model';
import { UserActions } from '../actions/index';

export const initialState: Address[] = [];

export function reducer(
  state = initialState,
  action: UserActions.UserAddressesAction
): Address[] {
  switch (action.type) {
    case UserActions.LOAD_USER_ADDRESSES_FAIL: {
      return initialState;
    }

    case UserActions.LOAD_USER_ADDRESSES_SUCCESS: {
      return action.payload ? action.payload : initialState;
    }
  }
  return state;
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';
import { OpfUi } from '@spartacus/opf/root';
import { OpfActions } from '../actions';

export const initialState: OpfUi = <OpfUi>{ termsAndConditionsChecked: false };

export function reducer(state: OpfUi = initialState, action: Action): OpfUi {
  switch (action.type) {
    case OpfActions.OPF_UI_UPDATE: {
      return {
        ...state,
        ...(action as OpfActions.OpfUiUpdate).payload,
      };
    }
    default: {
      return state;
    }
  }
}

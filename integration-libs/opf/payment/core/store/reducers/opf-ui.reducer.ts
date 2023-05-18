/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';
import { OpfUi } from '@spartacus/opf/payment/root';
import { OpfActions } from '../actions';

export const initialState: OpfUi = <OpfUi>{
  termsAndConditionsChecked: false,
  selectedPaymentOptionId: undefined,
};

export function reducer(state: OpfUi = initialState, action: Action): OpfUi {
  switch (action.type) {
    case OpfActions.UPDATE_OPF_UI: {
      return {
        ...state,
        ...(action as OpfActions.OpfUiUpdate).payload,
      };
    }
    case OpfActions.CLEAR_OPF_UI: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

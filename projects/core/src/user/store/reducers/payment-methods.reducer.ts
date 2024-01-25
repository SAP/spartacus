/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentDetails } from '../../../model/payment.model';
import { UserActions } from '../actions/index';

export const initialState: PaymentDetails[] = [];

export function reducer(
  state = initialState,
  action: UserActions.UserPaymentMethodsAction
): PaymentDetails[] {
  switch (action.type) {
    case UserActions.LOAD_USER_PAYMENT_METHODS_SUCCESS: {
      return action.payload ? action.payload : initialState;
    }

    case UserActions.LOAD_USER_PAYMENT_METHODS_FAIL: {
      return initialState;
    }
  }
  return state;
}

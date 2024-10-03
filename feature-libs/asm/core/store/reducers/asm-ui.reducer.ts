/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';
import { AsmUi } from '@spartacus/asm/root';
import { AsmActions } from '../actions/index';

export const initialState: AsmUi = <AsmUi>{ collapsed: false };

export function reducer(state: AsmUi = initialState, action: Action): AsmUi {
  switch (action.type) {
    case AsmActions.ASM_UI_UPDATE: {
      return {
        ...state,
        ...(action as AsmActions.AsmUiUpdate).payload,
      };
    }
    default: {
      return state;
    }
  }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';
import { OpfUi } from '@spartacus/opf/payment/root';

export const UPDATE_OPF_UI = '[OPF] Update UI';
export const CLEAR_OPF_UI = '[OPF] Clear UI';

export class OpfUiUpdate implements Action {
  readonly type = UPDATE_OPF_UI;
  constructor(public payload: OpfUi) {}
}

export class OpfUiClear implements Action {
  readonly type = CLEAR_OPF_UI;
}

export type OpfUiAction = OpfUiUpdate | OpfUiClear;

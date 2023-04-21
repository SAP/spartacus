/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';
import { OpfUi } from '@spartacus/opf/root';

export const OPF_UI_UPDATE = '[OPF] UI Update';

export class OpfUiUpdate implements Action {
  readonly type = OPF_UI_UPDATE;
  constructor(public payload: OpfUi) {}
}

export type OpfUiAction = OpfUiUpdate;

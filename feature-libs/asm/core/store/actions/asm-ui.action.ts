/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';
import { AsmUi } from '../../models/asm.models';

export const ASM_UI_UPDATE = '[Asm] UI Update';

export class AsmUiUpdate implements Action {
  readonly type = ASM_UI_UPDATE;
  constructor(public payload: AsmUi) {}
}
// action types
export type AsmUiAction = AsmUiUpdate;

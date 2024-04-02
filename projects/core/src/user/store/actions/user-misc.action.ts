/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';
export const CLEAR_USER_MISCS_DATA = '[User] Clear User Misc Data';

export class ClearUserMiscsData implements Action {
  readonly type = CLEAR_USER_MISCS_DATA;
}

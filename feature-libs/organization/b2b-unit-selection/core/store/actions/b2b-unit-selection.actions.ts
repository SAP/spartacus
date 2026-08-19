/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';
import { B2BUnit, ErrorAction } from '@spartacus/core';

// ── Load Org Units ────────────────────────────────────────────────────────────

export const LOAD_USER_ORG_UNITS = '[B2BUnitSelection] Load User Org Units';
export const LOAD_USER_ORG_UNITS_SUCCESS =
  '[B2BUnitSelection] Load User Org Units Success';
export const LOAD_USER_ORG_UNITS_FAIL =
  '[B2BUnitSelection] Load User Org Units Fail';

export class LoadUserOrgUnits implements Action {
  readonly type = LOAD_USER_ORG_UNITS;
  constructor(public payload: { userId: string }) {}
}

export class LoadUserOrgUnitsSuccess implements Action {
  readonly type = LOAD_USER_ORG_UNITS_SUCCESS;
  constructor(public payload: B2BUnit[]) {}
}

export class LoadUserOrgUnitsFail implements Action, ErrorAction {
  readonly type = LOAD_USER_ORG_UNITS_FAIL;
  constructor(public error: any) {}
}

// ── Set Default Org Unit ──────────────────────────────────────────────────────

export const SET_DEFAULT_ORG_UNIT = '[B2BUnitSelection] Set Default Org Unit';
export const SET_DEFAULT_ORG_UNIT_SUCCESS =
  '[B2BUnitSelection] Set Default Org Unit Success';
export const SET_DEFAULT_ORG_UNIT_FAIL =
  '[B2BUnitSelection] Set Default Org Unit Fail';

export class SetDefaultOrgUnit implements Action {
  readonly type = SET_DEFAULT_ORG_UNIT;
  constructor(
    public payload: {
      userId: string;
      unitName: string;
      /** true = triggered from the header selector (navigates home on success); false/undefined = triggered from the dialog */
      redirectToHome?: boolean;
    }
  ) {}
}

export class SetDefaultOrgUnitSuccess implements Action {
  readonly type = SET_DEFAULT_ORG_UNIT_SUCCESS;
}

export class SetDefaultOrgUnitFail implements Action, ErrorAction {
  readonly type = SET_DEFAULT_ORG_UNIT_FAIL;
  constructor(public error: any) {}
}

export type B2bUnitSelectionAction =
  | LoadUserOrgUnits
  | LoadUserOrgUnitsSuccess
  | LoadUserOrgUnitsFail
  | SetDefaultOrgUnit
  | SetDefaultOrgUnitSuccess
  | SetDefaultOrgUnitFail;

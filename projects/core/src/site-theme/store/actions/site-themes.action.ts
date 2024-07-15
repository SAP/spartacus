/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';
import { Theme } from '../../../model/misc.model';

export const LOAD_THEMES = '[Site-theme] Load themes';
export const LOAD_THEMES_FAIL = '[Site-theme] Load themes Fail';
export const LOAD_THEMES_SUCCESS = '[Site-theme] Load themes Success';
export const SET_ACTIVE_THEME = '[Site-theme] Set Active theme';
export const THEME_CHANGE = '[Site-theme] theme Change';

export class LoadThemes implements Action {
  readonly type = LOAD_THEMES;
}

export class LoadThemesFail implements Action {
  readonly type = LOAD_THEMES_FAIL;
  constructor(public payload: any) {}
}

export class LoadThemesSuccess implements Action {
  readonly type = LOAD_THEMES_SUCCESS;
  constructor(public payload: Theme[]) {}
}

export class SetActiveTheme implements Action {
  readonly type = SET_ACTIVE_THEME;
  constructor(public payload: string) {}
}

export class ThemeChange implements Action {
  readonly type = THEME_CHANGE;
  constructor(
    public payload: { previous: string | null; current: string | null }
  ) {}
}

// action types
export type SiteThemesAction =
  | LoadThemes
  | LoadThemesFail
  | LoadThemesSuccess
  | SetActiveTheme
  | ThemeChange;

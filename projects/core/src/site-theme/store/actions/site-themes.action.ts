/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';
import { SiteTheme } from '../../../model/misc.model';

export const LOAD_SITE_THEMES = '[Site-theme] Load site themes';
export const LOAD_SITE_THEMES_FAIL = '[Site-theme] Load site themes Fail';
export const LOAD_SITE_THEMES_SUCCESS = '[Site-theme] Load site themes Success';
export const SET_ACTIVE_SITE_THEME = '[Site-theme] Set Active site theme';
export const SITE_THEME_CHANGE = '[Site-theme] site theme Change';

export class LoadSiteThemes implements Action {
  readonly type = LOAD_SITE_THEMES;
}

export class LoadSiteThemesFail implements Action {
  readonly type = LOAD_SITE_THEMES_FAIL;
  constructor(public payload: any) {}
}

export class LoadSiteThemesSuccess implements Action {
  readonly type = LOAD_SITE_THEMES_SUCCESS;
  constructor(public payload: SiteTheme[]) {}
}

export class SetActiveSiteTheme implements Action {
  readonly type = SET_ACTIVE_SITE_THEME;
  constructor(public payload: string) {}
}

export class SiteThemeChange implements Action {
  readonly type = SITE_THEME_CHANGE;
  constructor(
    public payload: { previous: string | null; current: string | null }
  ) {}
}

// action types
export type SiteThemesAction =
  | LoadSiteThemes
  | LoadSiteThemesFail
  | LoadSiteThemesSuccess
  | SetActiveSiteTheme
  | SiteThemeChange;

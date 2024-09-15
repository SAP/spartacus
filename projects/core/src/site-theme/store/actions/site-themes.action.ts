/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';

export const SET_ACTIVE_SITE_THEME = '[Site-theme] Set Active Site Theme';
export const SITE_THEME_CHANGE = '[Site-theme] Site Theme Change';

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
export type SiteThemesAction = SetActiveSiteTheme | SiteThemeChange;

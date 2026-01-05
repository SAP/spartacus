/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SiteThemeActions } from '../actions/index';
import { SiteThemesState } from '../state';

export const initialState: SiteThemesState = {
  activeSiteTheme: null,
};

export function reducer(
  state = initialState,
  action: SiteThemeActions.SiteThemesAction
): SiteThemesState {
  if (action.type === SiteThemeActions.SET_ACTIVE_SITE_THEME) {
    const className = action.payload;

    return {
      ...state,
      activeSiteTheme: className,
    };
  }

  return state;
}

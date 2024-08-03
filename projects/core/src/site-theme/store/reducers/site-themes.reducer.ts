/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SiteTheme } from '../../../model/misc.model';
import { SiteThemeActions } from '../actions/index';
import { SiteThemesState } from '../state';

export const initialState: SiteThemesState = {
  entities: null,
  activeSiteTheme: null,
};

export function reducer(
  state = initialState,
  action: SiteThemeActions.SiteThemesAction
): SiteThemesState {
  switch (action.type) {
    case SiteThemeActions.LOAD_SITE_THEMES_SUCCESS: {
      const siteThemes: SiteTheme[] = action.payload;
      const entities = siteThemes.reduce(
        (
          siteThemeEntities: { [className: string]: SiteTheme },
          siteTheme: SiteTheme
        ) => {
          return {
            ...siteThemeEntities,
            [siteTheme.className ?? '']: siteTheme,
          };
        },
        {
          ...state.entities,
        }
      );

      return {
        ...state,
        entities,
      };
    }

    case SiteThemeActions.SET_ACTIVE_SITE_THEME: {
      const className = action.payload;

      return {
        ...state,
        activeSiteTheme: className,
      };
    }
  }
  return state;
}

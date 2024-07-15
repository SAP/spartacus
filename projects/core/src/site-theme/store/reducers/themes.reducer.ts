/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Theme } from '../../../model/misc.model';
import { SiteThemeActions } from '../actions/index';
import { ThemesState } from '../state';

export const initialState: ThemesState = {
  entities: null,
  activeTheme: null,
};

export function reducer(
  state = initialState,
  action: SiteThemeActions.ThemesAction
): ThemesState {
  switch (action.type) {
    case SiteThemeActions.LOAD_THEMES_SUCCESS: {
      const themes: Theme[] = action.payload;
      const entities = themes.reduce(
        (themeEntities: { [className: string]: Theme }, theme: Theme) => {
          return {
            ...themeEntities,
            [theme.className ?? '']: theme,
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

    case SiteThemeActions.SET_ACTIVE_THEME: {
      const className = action.payload;

      return {
        ...state,
        activeTheme: className,
      };
    }
  }
  return state;
}

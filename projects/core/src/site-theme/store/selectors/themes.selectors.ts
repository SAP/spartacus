/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Theme } from '../../../model/misc.model';
import {
  SiteThemeState,
  SiteThemeEntities,
  StateWithSiteTheme,
  ThemesState,
} from '../state';
import { getSiteThemeState } from './feature.selector';

const activeThemeSelector = (state: ThemesState) => state.activeTheme;
const themeEntitiesSelector = (state: ThemesState) => state.entities;

export const getThemesState: MemoizedSelector<StateWithSiteTheme, ThemesState> =
  createSelector(getSiteThemeState, (state: SiteThemeState) => state.themes);

export const getSiteThemeEntities: MemoizedSelector<
  StateWithSiteTheme,
  SiteThemeEntities | null
> = createSelector(getThemesState, themeEntitiesSelector);

export const getActiveTheme: MemoizedSelector<
  StateWithSiteTheme,
  string | null
> = createSelector(getThemesState, activeThemeSelector);

export const getAllThemes: MemoizedSelector<
  StateWithSiteTheme,
  Theme[] | null
> = createSelector(getSiteThemeEntities, (entities) => {
  return entities
    ? Object.keys(entities).map((className) => entities[className])
    : null;
});

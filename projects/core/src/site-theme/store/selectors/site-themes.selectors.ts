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
  SiteThemesState,
} from '../state';
import { getSiteThemeState } from './feature.selector';

const activeThemeSelector = (state: SiteThemesState) => state.activeTheme;
const themeEntitiesSelector = (state: SiteThemesState) => state.entities;

export const getSiteSiteThemesState: MemoizedSelector<
  StateWithSiteTheme,
  SiteThemesState
> = createSelector(getSiteThemeState, (state: SiteThemeState) => state.themes);

export const getSiteThemeEntities: MemoizedSelector<
  StateWithSiteTheme,
  SiteThemeEntities | null
> = createSelector(getSiteSiteThemesState, themeEntitiesSelector);

export const getActiveTheme: MemoizedSelector<
  StateWithSiteTheme,
  string | null
> = createSelector(getSiteSiteThemesState, activeThemeSelector);

export const getAllThemes: MemoizedSelector<
  StateWithSiteTheme,
  Theme[] | null
> = createSelector(getSiteThemeEntities, (entities) => {
  return entities
    ? Object.keys(entities).map((className) => entities[className])
    : null;
});

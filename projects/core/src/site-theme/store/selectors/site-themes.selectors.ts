/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSelector, MemoizedSelector } from '@ngrx/store';
import { SiteTheme } from '../../../model/misc.model';
import {
  SiteThemeState,
  SiteThemeEntities,
  StateWithSiteTheme,
  SiteThemesState,
} from '../state';
import { getSiteThemeState } from './feature.selector';

const activeSiteThemeSelector = (state: SiteThemesState) =>
  state.activeSiteTheme;
const siteThemeEntitiesSelector = (state: SiteThemesState) => state.entities;

export const getSiteThemesState: MemoizedSelector<
  StateWithSiteTheme,
  SiteThemesState
> = createSelector(getSiteThemeState, (state: SiteThemeState) => state.themes);

export const getSiteThemeEntities: MemoizedSelector<
  StateWithSiteTheme,
  SiteThemeEntities | null
> = createSelector(getSiteThemesState, siteThemeEntitiesSelector);

export const getActiveSiteTheme: MemoizedSelector<
  StateWithSiteTheme,
  string | null
> = createSelector(getSiteThemesState, activeSiteThemeSelector);

export const getAllSiteThemes: MemoizedSelector<
  StateWithSiteTheme,
  SiteTheme[] | null
> = createSelector(getSiteThemeEntities, (entities) => {
  return entities
    ? Object.keys(entities).map((className) => entities[className])
    : null;
});

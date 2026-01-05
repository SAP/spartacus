/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSelector, MemoizedSelector } from '@ngrx/store';
import { SiteThemesState, SiteThemeState, StateWithSiteTheme } from '../state';
import { getSiteThemeState } from './feature.selector';

const activeSiteThemeSelector = (state: SiteThemesState) =>
  state.activeSiteTheme;

export const getSiteThemesState: MemoizedSelector<
  StateWithSiteTheme,
  SiteThemesState
> = createSelector(getSiteThemeState, (state: SiteThemeState) => state.themes);

export const getActiveSiteTheme: MemoizedSelector<
  StateWithSiteTheme,
  string | null
> = createSelector(getSiteThemesState, activeSiteThemeSelector);

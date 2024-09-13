/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import {
  SiteThemeState,
  SITE_THEME_FEATURE,
  StateWithSiteTheme,
} from '../state';

export const getSiteThemeState: MemoizedSelector<
  StateWithSiteTheme,
  SiteThemeState
> = createFeatureSelector<SiteThemeState>(SITE_THEME_FEATURE);

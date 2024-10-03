/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import {
  SiteContextState,
  SITE_CONTEXT_FEATURE,
  StateWithSiteContext,
} from '../state';

export const getSiteContextState: MemoizedSelector<
  StateWithSiteContext,
  SiteContextState
> = createFeatureSelector<SiteContextState>(SITE_CONTEXT_FEATURE);

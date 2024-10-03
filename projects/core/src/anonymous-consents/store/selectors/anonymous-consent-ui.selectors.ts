/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateWithAnonymousConsents } from '../anonymous-consents-state';
import { getAnonymousConsentState } from './feature.selector';

export const getAnonymousConsentTemplatesUpdate: MemoizedSelector<
  StateWithAnonymousConsents,
  boolean
> = createSelector(getAnonymousConsentState, (state) => state.ui.updated);

export const getAnonymousConsentsBannerDismissed: MemoizedSelector<
  StateWithAnonymousConsents,
  boolean
> = createSelector(
  getAnonymousConsentState,
  (state) => state.ui.bannerDismissed
);

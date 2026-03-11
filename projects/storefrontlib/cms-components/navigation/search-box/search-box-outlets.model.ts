/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';

export enum SearchBoxOutlets {
  RECENT_SEARCHES = 'SearchBoxOutlets.RECENT_SEARCHES',
  RECENT_SEARCHES_HEADER = 'SearchBoxOutlets.RECENT_SEARCHES_HEADER',
  TRENDING_SEARCHES = 'SearchBoxOutlets.TRENDING_SEARCHES',
}

/**
 * Context passed to the RECENT_SEARCHES_HEADER outlet.
 * Allows the outlet to render a Clear button that calls back into the host.
 */
export interface SearchBoxRecentSearchesHeaderContext {
  clearRecentSearches?(event?: MouseEvent): void;
  focusPreviousGroup?(event: UIEvent): void;
}

/**
 * Optional service that can be provided (for example, by CDS)
 * to enable Clear recent searches in the search panel header.
 *
 * When provided, the host passes clearRecentSearches into the
 * RECENT_SEARCHES_HEADER outlet context.
 */
export const RECENT_SEARCHES_HEADER_CLEAR_SERVICE = new InjectionToken<{
  clearPhrases(): void;
}>('RecentSearchesHeaderClearService');

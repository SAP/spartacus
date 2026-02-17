/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SearchBoxConfig {
  displaySuggestions?: boolean | string;
  displayProducts?: boolean | string;
  displayProductImages?: boolean | string;
  maxProducts?: number;
  maxSuggestions?: number;
  minCharactersBeforeRequest?: number;
  recentSearches?: boolean | string;
  maxRecentSearches?: number;
  trendingSearches?: boolean | string;
  maxTrendingSearches?: number;
}

export interface SearchResults {
  message?: string;
  products?: any[];
  suggestions?: string[];
  recentSearches?: string[];
}

/**
 * CDS Profile Tag window object interface.
 * This is a minimal subset of the CDS ProfileTagWindowObject interface
 * needed by search-box component to avoid circular dependency with CDS integration library.
 */
export interface ProfileTagWindowObject extends Window {
  Y_TRACKING?: {
    recentSearches?: {
      clearPhrases(): void;
    };
  };
}

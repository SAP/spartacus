/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
}

export interface SearchResults {
  message?: string;
  products?: any[];
  suggestions?: string[];
}

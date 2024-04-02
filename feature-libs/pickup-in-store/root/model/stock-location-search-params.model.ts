/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/** The latitude and longitude of the user for searching for a location. */
type BrowserLocationSearchParameters = {
  latitude: number;
  longitude: number;
};

/** The free text string for search for a location. */
type FreeTextSearchParameters = {
  location: string;
};

/** The search parameters for finding a location, either by latitude and longitude or a free text search. */
export type LocationSearchParams =
  | BrowserLocationSearchParameters
  | FreeTextSearchParameters;

/** A product code and the search parameters for finding a store with stock for it. */
export type StockLocationSearchParams = {
  productCode: string;
} & LocationSearchParams;

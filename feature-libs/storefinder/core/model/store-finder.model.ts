/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaginationModel, PointOfService, SortModel } from '@spartacus/core';

export interface StoreFinderSearchPage {
  boundEastLongitude?: number;
  boundNorthLatitude?: number;
  boundSouthLatitude?: number;
  boundWestLongitude?: number;
  locationText?: string;
  pagination?: PaginationModel;
  sorts?: SortModel[];
  sourceLatitude?: number;
  sourceLongitude?: number;
  stores?: PointOfService[];
}

export interface StoreCount {
  count?: number;
  isoCode?: string;
  name?: string;
  type?: string;
}

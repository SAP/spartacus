/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeoPoint, PointOfService, SearchConfig } from '@spartacus/core';
import { Observable } from 'rxjs';
import { StoreCount, StoreFinderSearchPage } from '../model/store-finder.model';

export abstract class StoreFinderAdapter {
  abstract search(
    query: string,
    searchConfig: SearchConfig,
    longitudeLatitude?: GeoPoint,
    radius?: number
  ): Observable<StoreFinderSearchPage>;

  abstract loadCounts(): Observable<StoreCount[]>;

  abstract load(storeId: string): Observable<PointOfService>;
}

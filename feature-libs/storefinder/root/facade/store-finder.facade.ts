/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  facadeFactory,
  GeoPoint,
  PointOfService,
  SearchConfig,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { STORE_FINDER_FEATURE } from '../feature-name';
import { StoreEntities } from '../model/store-entities.model';

/**
 * Store the Point of Service a user wants to collect a product from before it is added to the cart.
 */
@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: StoreFinderFacade,
      feature: STORE_FINDER_FEATURE,
      methods: [
        'getStoresLoading',
        'getStoresLoaded',
        'getFindStoresEntities',
        'getViewAllStoresLoading',
        'getViewAllStoresEntities',
        'findStoresAction',
        'viewAllStores',
        'viewStoreById',
        'callFindStoresAction',
        'getStoreLatitude',
        'getStoreLongitude',
        'getDirections',
        'getFindStoreEntityById',
      ],
      async: true,
    }),
})
export abstract class StoreFinderFacade {
  abstract getStoresLoading(): Observable<boolean>;
  abstract getStoresLoaded(): Observable<boolean>;
  abstract getFindStoresEntities(): Observable<StoreEntities>;
  abstract getViewAllStoresLoading(): Observable<boolean>;
  abstract getViewAllStoresEntities(): Observable<StoreEntities>;
  abstract findStoresAction(
    queryText: string,
    searchConfig?: SearchConfig,
    longitudeLatitude?: GeoPoint,
    countryIsoCode?: string,
    useMyLocation?: boolean,
    radius?: number
  ): void;
  abstract viewAllStores(): void;
  abstract viewStoreById(storeId: string): void;
  abstract callFindStoresAction(routeParams: { [key: string]: string }): void;
  abstract getStoreLatitude(location: PointOfService): number | undefined;
  abstract getStoreLongitude(location: PointOfService): number | undefined;
  abstract getDirections(location: PointOfService): string;
  abstract getFindStoreEntityById(): Observable<StoreEntities>;
}

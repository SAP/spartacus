/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  OccEndpointsService,
  Stock,
  StoreFinderStockSearchPage,
} from '@spartacus/core';
import { StockAdapter } from '@spartacus/pickup-in-store/core';
import { LocationSearchParams } from '@spartacus/pickup-in-store/root';
import { Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

const getDistance = (
  lat1: number,
  lat2: number,
  lon1: number,
  lon2: number
) => {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const A =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(A), Math.sqrt(1 - A));

  const d = R * c; // in metres
  return d;
};

/**
 * Adapter for finding stock levels of a product in stores from the OCC APIs.
 */
@Injectable()
export class OccStockAdapter implements StockAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService
  ) {
    // Intentional empty constructor
  }

  loadStockLevels(
    productCode: string,
    location: LocationSearchParams
  ): Observable<StoreFinderStockSearchPage> {
    const LOCATION: {
      latitude: number;
      longitude: number;
    } = location as {
      latitude: number;
      longitude: number;
    };

    const t1 = new Date();
    const RESULT = this.http
      .get<StoreFinderStockSearchPage>(
        this.occEndpointsService.buildUrl('stock', {
          urlParams: { productCode },
          queryParams: {
            ...location,
            fields: 'FULL',
            longitude: 0,
            latitude: 0,
            pageSize: 1,
          },
        })
      )
      .pipe(
        map((request) => request.pagination?.totalResults || 0),
        mergeMap((totalResults: number) =>
          this.http.get<StoreFinderStockSearchPage>(
            this.occEndpointsService.buildUrl('stock', {
              urlParams: { productCode },
              queryParams: {
                ...location,
                fields: 'FULL',
                longitude: 0,
                latitude: 0,
                pageSize: totalResults,
              },
            })
          )
        ),
        map((request) => ({
          // sets the formattedDistance to metres
          ...request,
          stores: request.stores?.map((store) => ({
            ...store,
            formattedDistance: getDistance(
              LOCATION.latitude,
              store.geoPoint?.latitude as number,
              LOCATION.longitude,
              store.geoPoint?.longitude as number
            ).toString(),
          })),
        })),
        map((request) => ({
          // orders by distance ascending
          ...request,
          stores: request.stores
            ?.map((store) => store)
            .sort((a, b) => +a.formattedDistance - +b.formattedDistance),
        })),
        map((request) => ({
          // sets the formattedDistance to miles
          ...request,
          stores: request.stores?.map((store) => ({
            ...store,
            formattedDistance: `${(+store.formattedDistance / 1609).toFixed(
              2
            )} miles`,
          })),
        })),
        tap((request) => {
          const t2 = new Date();
          const diff = t2.getTime() - t1.getTime();
          console.log(
            'request with a total of',
            request.stores?.length,
            'stores',
            diff / 1000,
            'seconds'
          );
        })
      );

    return RESULT;
    // return this.http.get<StoreFinderStockSearchPage>(
    //   this.occEndpointsService.buildUrl('stock', {
    //     urlParams: { productCode },
    //     queryParams: { ...location, fields: 'FULL' },
    //   })
    // );
  }

  loadStockLevelAtStore(
    productCode: string,
    storeName: string
  ): Observable<Stock> {
    return this.http.get<Stock>(
      this.occEndpointsService.buildUrl('stockAtStore', {
        urlParams: { productCode, storeName },
      })
    );
  }
}

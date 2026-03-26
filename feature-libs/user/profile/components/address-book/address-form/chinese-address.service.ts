/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoggerService, OccEndpointsService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface City {
  name: string;
  isocode: string;
}

export interface District {
  name: string;
  isocode: string;
}

interface CityListResponse {
  cities: City[];
}

interface DistrictListResponse {
  districts: District[];
}

@Injectable({
  providedIn: 'root',
})
export class ChineseAddressService {
  protected http = inject(HttpClient);
  protected occEndpoints = inject(OccEndpointsService);
  protected logger = inject(LoggerService);

  getCities(regionIsocode: string): Observable<City[]> {
    const url = this.occEndpoints.buildUrl('chineseAddressCities', {
      urlParams: { regionId: regionIsocode },
    });
    return this.http
      .get<CityListResponse>(url, {
        params: { fields: 'cities(name,isocode)' },
      })
      .pipe(
        map((res) => res.cities ?? []),
        catchError((error) => {
          this.logger.error('Failed to load cities', error);
          return of([]);
        })
      );
  }

  getDistricts(cityIsocode: string): Observable<District[]> {
    const url = this.occEndpoints.buildUrl('chineseAddressDistricts', {
      urlParams: { cityId: cityIsocode },
    });
    return this.http
      .get<DistrictListResponse>(url, {
        params: { fields: 'districts(name,isocode)' },
      })
      .pipe(
        map((res) => res.districts ?? []),
        catchError((error) => {
          this.logger.error('Failed to load districts', error);
          return of([]);
        })
      );
  }
}

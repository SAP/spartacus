import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

import { StoreFinderSearchConfig, LongitudeLatitude } from './../model';

import { OccConfig } from '../../occ/config/occ-config';
import { OccE2eConfigurationService } from '../occ/e2e/e2e-configuration-service';
import { StoreFinderSearchPage } from '../../occ/occ-models';

const STORES_ENDPOINT = 'stores';
const STORES_DISPLAYED = 'e2egoogleservices.storesdisplayed';

@Injectable()
export class OccStoreFinderService {
  constructor(
    private http: HttpClient,
    private occModuleConfig: OccConfig,
    private e2eConfigService: OccE2eConfigurationService
  ) {}

  findStores(
    query: string,
    searchConfig: StoreFinderSearchConfig,
    longitudeLatitude?: LongitudeLatitude
  ): Observable<any> {
    return this.e2eConfigService.getConfiguration(STORES_DISPLAYED).pipe(
      mergeMap(result => {
        searchConfig = { ...searchConfig, pageSize: result };
        return this.callOccFindStores(query, searchConfig, longitudeLatitude);
      })
    );
  }

  storesCount(): Observable<any> {
    const storeCountUrl = this.getStoresEndpoint('count');

    return this.http
      .get(storeCountUrl)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  findStoreById(storeId: string): Observable<any> {
    const storeDetailsUrl = this.getStoresEndpoint(storeId);
    const params = { fields: 'FULL' };

    return this.http
      .get(storeDetailsUrl, { params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  findStoresByCountry(countryIsoCode: string): Observable<any> {
    const storesByCountryUrl = this.getStoresEndpoint(
      'country/' + countryIsoCode
    );

    return this.http
      .get(storesByCountryUrl)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  findStoresByRegion(
    countryIsoCode: string,
    regionIsoCode: string
  ): Observable<any> {
    const storesByRegionUrl = this.getStoresEndpoint(
      'country/' + countryIsoCode + '/region/' + regionIsoCode
    );

    return this.http
      .get(storesByRegionUrl)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  protected callOccFindStores(
    query: string,
    searchConfig: StoreFinderSearchConfig,
    longitudeLatitude?: LongitudeLatitude
  ): Observable<StoreFinderSearchPage> {
    const url = this.getStoresEndpoint();
    let params: HttpParams = new HttpParams({
      fromString:
        '&fields=stores(name,displayName,openingHours(weekDayOpeningList(FULL),specialDayOpeningList(FULL)),' +
        'geoPoint(latitude,longitude),address(line1,line2,town,region(FULL),postalCode,phone,country,email), features),' +
        'pagination(DEFAULT),' +
        'sorts(DEFAULT)'
    });
    if (longitudeLatitude) {
      params = params.set('longitude', String(longitudeLatitude.longitude));
      params = params.set('latitude', String(longitudeLatitude.latitude));
    } else {
      params = params.set('query', query);
    }
    if (searchConfig.pageSize) {
      params = params.set('pageSize', searchConfig.pageSize.toString());
    }
    if (searchConfig.currentPage) {
      params = params.set('currentPage', searchConfig.currentPage.toString());
    }
    if (searchConfig.sort) {
      params = params.set('sort', searchConfig.sort);
    }

    return this.http
      .get<StoreFinderSearchPage>(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  protected getStoresEndpoint(url?: string) {
    const baseUrl =
      this.occModuleConfig.server.baseUrl +
      this.occModuleConfig.server.occPrefix +
      this.occModuleConfig.site.baseSite +
      '/' +
      STORES_ENDPOINT;

    return url ? baseUrl + '/' + url : baseUrl;
  }
}

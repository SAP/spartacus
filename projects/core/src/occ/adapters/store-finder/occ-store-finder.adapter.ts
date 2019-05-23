import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { StoreFinderSearchConfig } from '../../../store-finder/model';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { PointOfService } from '../../../model/point-of-service.model';
import { StoreFinderAdapter } from '../../../store-finder/connectors/store-finder.adapter';
import { GeoPoint } from '../../../model/misc.model';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models/occ.models';
import {
  STORE_FINDER_SEARCH_PAGE_NORMALIZER,
  STORE_COUNT_NORMALIZER,
  POINT_OF_SERVICE_NORMALIZER,
} from '../../../store-finder/connectors';
import {
  StoreFinderSearchPage,
  StoreCount,
} from '../../../model/store-finder.model';

const STORES_ENDPOINT = 'stores';

@Injectable()
export class OccStoreFinderAdapter implements StoreFinderAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  search(
    query: string,
    searchConfig: StoreFinderSearchConfig,
    longitudeLatitude?: GeoPoint
  ): Observable<StoreFinderSearchPage> {
    return this.callOccFindStores(query, searchConfig, longitudeLatitude).pipe(
      catchError((error: any) => throwError(error.json())),
      this.converter.pipeable(STORE_FINDER_SEARCH_PAGE_NORMALIZER)
    );
  }

  loadCounts(): Observable<StoreCount[]> {
    const storeCountUrl = this.getStoresEndpoint('storescounts');

    return this.http.get<Occ.StoreCountList>(storeCountUrl).pipe(
      map(({ countriesAndRegionsStoreCount }) => countriesAndRegionsStoreCount),
      catchError((error: any) => throwError(error.json())),
      this.converter.pipeableMany(STORE_COUNT_NORMALIZER)
    );
  }

  load(storeId: string): Observable<PointOfService> {
    const storeDetailsUrl = this.getStoresEndpoint(storeId);
    const params = { fields: 'FULL' };

    return this.http.get<Occ.PointOfService>(storeDetailsUrl, { params }).pipe(
      catchError((error: any) => throwError(error.json())),
      this.converter.pipeable(POINT_OF_SERVICE_NORMALIZER)
    );
  }

  protected callOccFindStores(
    query: string,
    searchConfig: StoreFinderSearchConfig,
    longitudeLatitude?: GeoPoint
  ): Observable<Occ.StoreFinderSearchPage> {
    const url = this.getStoresEndpoint();
    let params: HttpParams = new HttpParams({
      fromString:
        'fields=stores(name,displayName,openingHours(weekDayOpeningList(FULL),specialDayOpeningList(FULL)),' +
        'geoPoint(latitude,longitude),address(line1,line2,town,region(FULL),postalCode,phone,country,email), features),' +
        'pagination(DEFAULT),' +
        'sorts(DEFAULT)',
    });

    if (longitudeLatitude) {
      params = params.set('longitude', String(longitudeLatitude.longitude));
      params = params.set('latitude', String(longitudeLatitude.latitude));
    } else {
      params = params.set('query', query);
    }
    if (searchConfig.pageSize) {
      params = params.set('pageSize', String(searchConfig.pageSize));
    }
    if (searchConfig.currentPage) {
      params = params.set('currentPage', String(searchConfig.currentPage));
    }
    if (searchConfig.sort) {
      params = params.set('sort', searchConfig.sort);
    }

    return this.http.get<Occ.StoreFinderSearchPage>(url, { params }).pipe(
      catchError((error: any) => {
        if (error.json) {
          return throwError(error.json());
        }
        return throwError(error);
      })
    );
  }

  protected getStoresEndpoint(url?: string): string {
    const baseUrl = this.occEndpoints.getEndpoint(STORES_ENDPOINT);

    return url ? baseUrl + '/' + url : baseUrl;
  }
}

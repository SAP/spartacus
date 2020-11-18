import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  POINT_OF_SERVICE_NORMALIZER,
  STORE_COUNT_NORMALIZER,
  STORE_FINDER_SEARCH_PAGE_NORMALIZER,
  StoreFinderAdapter,
} from '@spartacus/misc/storefinder/core';
import {
  ConverterService,
  GeoPoint,
  Occ,
  OccEndpointsService,
  PointOfService,
  SearchConfig,
  StoreCount,
  StoreFinderSearchPage,
} from '@spartacus/core';

@Injectable()
export class OccStoreFinderAdapter implements StoreFinderAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  search(
    query: string,
    searchConfig: SearchConfig,
    longitudeLatitude?: GeoPoint,
    radius?: number
  ): Observable<StoreFinderSearchPage> {
    return this.callOccFindStores(
      query,
      searchConfig,
      longitudeLatitude,
      radius
    ).pipe(this.converterService.pipeable(STORE_FINDER_SEARCH_PAGE_NORMALIZER));
  }

  loadCounts(): Observable<StoreCount[]> {
    return this.http
      .get<Occ.StoreCountList>(this.occEndpointsService.getUrl('storescounts'))
      .pipe(
        map(
          ({ countriesAndRegionsStoreCount }) => countriesAndRegionsStoreCount
        ),
        this.converterService.pipeableMany(STORE_COUNT_NORMALIZER)
      );
  }

  load(storeId: string): Observable<PointOfService> {
    return this.http
      .get<Occ.PointOfService>(
        this.occEndpointsService.getUrl('store', { storeId })
      )
      .pipe(this.converterService.pipeable(POINT_OF_SERVICE_NORMALIZER));
  }

  protected callOccFindStores(
    query: string,
    searchConfig: SearchConfig,
    longitudeLatitude?: GeoPoint,
    radius?: number
  ): Observable<Occ.StoreFinderSearchPage> {
    const params = {};

    if (longitudeLatitude) {
      params['longitude'] = String(longitudeLatitude.longitude);
      params['latitude'] = String(longitudeLatitude.latitude);
      params['radius'] = String(radius);
    } else {
      params['query'] = query;
    }

    if (searchConfig.pageSize) {
      params['pageSize'] = String(searchConfig.pageSize);
    }
    if (searchConfig.currentPage) {
      params['currentPage'] = String(searchConfig.currentPage);
    }
    if (searchConfig.sort) {
      params['sort'] = searchConfig.sort;
    }

    return this.http.get<Occ.StoreFinderSearchPage>(
      this.occEndpointsService.getUrl('stores', undefined, params)
    );
  }
}

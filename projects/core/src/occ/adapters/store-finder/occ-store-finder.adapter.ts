import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GeoPoint } from '../../../model/misc.model';
import { PointOfService } from '../../../model/point-of-service.model';
import {
  StoreCount,
  StoreFinderSearchPage,
} from '../../../model/store-finder.model';
import {
  POINT_OF_SERVICE_NORMALIZER,
  STORE_COUNT_NORMALIZER,
  STORE_FINDER_SEARCH_PAGE_NORMALIZER,
} from '../../../store-finder/connectors';
import { StoreFinderAdapter } from '../../../store-finder/connectors/store-finder.adapter';
import { StoreFinderSearchConfig } from '../../../store-finder/model';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models/occ.models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';

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
      this.converter.pipeable(STORE_FINDER_SEARCH_PAGE_NORMALIZER)
    );
  }

  loadCounts(): Observable<StoreCount[]> {
    const storeCountUrl = this.getStoresEndpoint('storescounts');

    return this.http.get<Occ.StoreCountList>(storeCountUrl).pipe(
      map(({ countriesAndRegionsStoreCount }) => countriesAndRegionsStoreCount),
      this.converter.pipeableMany(STORE_COUNT_NORMALIZER)
    );
  }

  load(storeId: string): Observable<PointOfService> {
    const storeDetailsUrl = this.getStoresEndpoint(storeId);
    const params = { fields: 'FULL' };

    return this.http
      .get<Occ.PointOfService>(storeDetailsUrl, { params })
      .pipe(this.converter.pipeable(POINT_OF_SERVICE_NORMALIZER));
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

    return this.http.get<Occ.StoreFinderSearchPage>(url, { params });
  }

  protected getStoresEndpoint(url?: string): string {
    const baseUrl = this.occEndpoints.getEndpoint(STORES_ENDPOINT);

    return url ? baseUrl + '/' + url : baseUrl;
  }
}

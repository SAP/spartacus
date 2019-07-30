import { HttpClient } from '@angular/common/http';
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
    return this.http
      .get<Occ.StoreCountList>(this.occEndpoints.getUrl('storescounts'))
      .pipe(
        map(
          ({ countriesAndRegionsStoreCount }) => countriesAndRegionsStoreCount
        ),
        this.converter.pipeableMany(STORE_COUNT_NORMALIZER)
      );
  }

  load(storeId: string): Observable<PointOfService> {
    return this.http
      .get<Occ.PointOfService>(this.occEndpoints.getUrl('store', { storeId }))
      .pipe(this.converter.pipeable(POINT_OF_SERVICE_NORMALIZER));
  }

  protected callOccFindStores(
    query: string,
    searchConfig: StoreFinderSearchConfig,
    longitudeLatitude?: GeoPoint
  ): Observable<Occ.StoreFinderSearchPage> {
    const params = {};

    if (longitudeLatitude) {
      params['longitude'] = String(longitudeLatitude.longitude);
      params['latitude'] = String(longitudeLatitude.latitude);
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
      this.occEndpoints.getUrl('stores', undefined, params)
    );
  }
}

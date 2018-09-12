import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

import { SearchConfig } from '../../store-finder/models/search-config';

import { OccModuleConfig } from '../occ-module-config';
import { OccE2eConfigurationService } from '../e2e/e2e-configuration-service';

const STORES_ENDPOINT = 'stores';
const STORES_DISPLAYED = 'e2egoogleservices.storesdisplayed';

@Injectable()
export class OccStoreFinderService {
  constructor(
    private http: HttpClient,
    private occModuleConfig: OccModuleConfig,
    private e2eConfigService: OccE2eConfigurationService
  ) {}

  findStores(query: string, searchConfig: SearchConfig): Observable<any> {
    return this.e2eConfigService.getConfiguration(STORES_DISPLAYED).pipe(
      mergeMap(result => {
        searchConfig = { ...searchConfig, pageSize: result };
        return this.callOccFindStores(query, searchConfig);
      })
    );
  }

  storesCount(): Observable<any> {
    const storeCountUrl = this.getStoresEndpoint('count');

    return this.http
      .get(storeCountUrl)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  protected callOccFindStores(
    query: string,
    searchConfig: SearchConfig
  ): Observable<any> {
    const url = this.getStoresEndpoint();
    let params: HttpParams = new HttpParams({
      fromString:
        '&fields=stores(name,displayName,openingHours(weekDayOpeningList(FULL),specialDayOpeningList(FULL)),' +
        'geoPoint(latitude,longitude),address(line1,line2,town,region(FULL),postalCode,phone,country) ),' +
        'pagination(DEFAULT),' +
        'sorts(DEFAULT)'
    });
    params = params.set('query', query);
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
      .get(url, { params: params })
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

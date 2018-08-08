import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SearchConfig } from '../../store-finder/search-config';

import { ConfigService } from '../config.service';

const STORES_ENDPOINT = 'stores';
const DEFAULT_SEARCH_CONFIG: SearchConfig = {
    pageSize: 3,
    sort: 'asc',
    currentPage: 0
  };

@Injectable()
export class OccStoreFinderService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  findStores(address: string, searchConfig: SearchConfig = DEFAULT_SEARCH_CONFIG): Observable<any> {
    const url = this.getStoresEndpoint();
    let params = new HttpParams({
        fromString:
          '&fields=stores(name,displayName,openingHours(weekDayOpeningList(FULL),specialDayOpeningList(FULL)),' +
          'address(line1,line2,town,region(FULL),postalCode,phone,country) ),' +
          'pagination(DEFAULT),' +
          'sorts(DEFAULT)'
      });
      params = params.set('query', address);
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

  protected getStoresEndpoint() {
    return (
      this.configService.server.baseUrl +
      this.configService.server.occPrefix +
      this.configService.site.baseSite +
      '/' +
      STORES_ENDPOINT
    );
  }
}

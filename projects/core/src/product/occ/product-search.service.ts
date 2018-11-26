import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { SearchConfig } from '../model/search-config';
import { OccConfig } from '../../occ/config/occ-config';

const ENDPOINT_PRODUCT = 'products';
const DEFAULT_SEARCH_CONFIG: SearchConfig = {
  pageSize: 20
};

@Injectable()
export class OccProductSearchService {
  constructor(private http: HttpClient, private config: OccConfig) {}

  protected getProductEndpoint() {
    return (
      (this.config.server.baseUrl || '') +
      this.config.server.occPrefix +
      this.config.site.baseSite +
      '/' +
      ENDPOINT_PRODUCT
    );
  }

  query(
    fullQuery: string,
    searchConfig: SearchConfig = DEFAULT_SEARCH_CONFIG
  ): Observable<any> {
    let params = new HttpParams({
      fromString:
        '&fields=' +
        'products(code,name,summary,price(FULL),images(DEFAULT),stock(FULL),averageRating),' +
        'facets,' +
        'breadcrumbs,' +
        'pagination(DEFAULT),' +
        'sorts(DEFAULT)'
    });
    params = params.set('query', fullQuery);
    if (searchConfig.pageSize) {
      params = params.set('pageSize', searchConfig.pageSize.toString());
    }
    if (searchConfig.currentPage) {
      params = params.set('currentPage', searchConfig.currentPage.toString());
    }
    if (searchConfig.sortCode) {
      params = params.set('sort', searchConfig.sortCode);
    }

    return this.http
      .get(this.getProductEndpoint() + '/search', { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  queryProductSuggestions(term: string, pageSize = 3): Observable<any> {
    return this.http
      .get(this.getProductEndpoint() + '/suggestions', {
        params: new HttpParams()
          .set('term', term)
          .set('max', pageSize.toString())
      })
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { ConfigService } from '../config.service';

const DEFAULT_PRODUCT_PAGE_LIST = 20;
const ENDPOINT_PRODUCT = 'products';

@Injectable()
export class OccProductSearchService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  protected getProductEndpoint() {
    return (
      this.config.server.baseUrl +
      this.config.server.occPrefix +
      this.config.site.baseSite +
      '/' +
      ENDPOINT_PRODUCT
    );
  }

  query(
    fullQuery: string,
    pageSize = DEFAULT_PRODUCT_PAGE_LIST
  ): Observable<any> {
    const params = new HttpParams({
      fromString:
        `query=${fullQuery}&pageSize=${pageSize}` +
        `&fields=products(code,name,summary,price(FULL),images(DEFAULT)),facets,breadcrumbs,pagination(DEFAULT)`
    });

    return this.http
      .get(this.getProductEndpoint() + '/search', { params: params })
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  queryProductSuggestions(term: string, pageSize = 3): Observable<any> {
    return this.http
      .get(this.getProductEndpoint() + '/suggestions', {
        params: new HttpParams()
          .set('term', term)
          .set('max', pageSize.toString())
      })
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}

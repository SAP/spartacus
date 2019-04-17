import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SearchConfig } from '../model/search-config';
import {
  SuggestionList,
  ProductSearchPage,
} from '../../occ/occ-models/occ.models';

import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';

const DEFAULT_SEARCH_CONFIG: SearchConfig = {
  pageSize: 20,
};

@Injectable()
export class ProductSearchLoaderService {
  constructor(
    private http: HttpClient,
    private occEndpoints: OccEndpointsService
  ) {}

  loadSearch(
    fullQuery: string,
    searchConfig: SearchConfig = DEFAULT_SEARCH_CONFIG
  ): Observable<ProductSearchPage> {
    return this.http
      .get(this.getSearchEndpoint(fullQuery, searchConfig))
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  loadSuggestions(term: string, pageSize = 3): Observable<SuggestionList> {
    return this.http
      .get(this.getSuggestionEndpoint(term, pageSize.toString()))
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  protected getSearchEndpoint(
    query: string,
    searchConfig: SearchConfig
  ): string {
    return this.occEndpoints.getUrl(
      'productSearch',
      {
        query,
      },
      {
        pageSize: searchConfig.pageSize,
        currentPage: searchConfig.currentPage,
        sort: searchConfig.sortCode,
      }
    );
  }

  protected getSuggestionEndpoint(term: string, max: string): string {
    return this.occEndpoints.getUrl('productSuggestions', {
      term,
      max,
    });
  }
}

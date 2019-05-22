import { Injectable } from '@angular/core';
import { ProductSearchAdapter } from '../../../product/connectors/search/product-search.adapter';
import { SearchConfig } from '../../../product/model/search-config';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { ConverterService } from '../../../util/converter.service';
import {
  PRODUCT_SEARCH_PAGE_NORMALIZER,
  PRODUCT_SUGGESTION_NORMALIZER,
} from '../../../product/connectors/search/converters';
import { pluck } from 'rxjs/operators';
import {
  Suggestion,
  ProductSearchPage,
} from '../../../model/product-search.model';

const DEFAULT_SEARCH_CONFIG: SearchConfig = {
  pageSize: 20,
};

@Injectable()
export class OccProductSearchAdapter implements ProductSearchAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  search(
    query: string,
    searchConfig: SearchConfig = DEFAULT_SEARCH_CONFIG
  ): Observable<ProductSearchPage> {
    return this.http
      .get(this.getSearchEndpoint(query, searchConfig))
      .pipe(this.converter.pipeable(PRODUCT_SEARCH_PAGE_NORMALIZER));
  }

  loadSuggestions(
    term: string,
    pageSize: number = 3
  ): Observable<Suggestion[]> {
    return this.http
      .get(this.getSuggestionEndpoint(term, pageSize.toString()))
      .pipe(
        pluck('suggestions'),
        this.converter.pipeableMany(PRODUCT_SUGGESTION_NORMALIZER)
      );
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

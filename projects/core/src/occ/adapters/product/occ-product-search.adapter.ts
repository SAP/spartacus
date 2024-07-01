/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  ProductSearchPage,
  Suggestion,
} from '../../../model/product-search.model';
import {
  PRODUCT_SEARCH_PAGE_NORMALIZER,
  PRODUCT_SUGGESTION_NORMALIZER,
} from '../../../product/connectors/search/converters';
import { ProductSearchAdapter } from '../../../product/connectors/search/product-search.adapter';
import { SearchConfig } from '../../../product/model/search-config';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models/occ.models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { OCC_HTTP_TOKEN } from '../../utils';
import { Router } from '@angular/router';
@Injectable()
export class OccProductSearchAdapter implements ProductSearchAdapter {
  protected router = inject(Router, {
    optional: true,
  });

  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  readonly DEFAULT_SEARCH_CONFIG: SearchConfig = {
    pageSize: 20,
  };

  search(
    query: string,
    searchConfig: SearchConfig = this.DEFAULT_SEARCH_CONFIG
  ): Observable<ProductSearchPage> {
    const context = new HttpContext().set(OCC_HTTP_TOKEN, {
      sendUserIdAsHeader: true,
    });

    return this.http
      .get(this.getSearchEndpoint(query, searchConfig), { context })
      .pipe(
        this.converter.pipeable(PRODUCT_SEARCH_PAGE_NORMALIZER),
        tap(
          (productSearchPage) =>
            productSearchPage.keywordRedirectUrl &&
            this.router?.navigate([productSearchPage.keywordRedirectUrl])
        )
      );
  }

  searchByCodes(codeList: string[]): Observable<ProductSearchPage> {
    const MAX_CODES_PER_REQUEST = 100;
    const requestsCount = Math.ceil(codeList.length / MAX_CODES_PER_REQUEST);
    const requests = [];
    const context = new HttpContext().set(OCC_HTTP_TOKEN, {
      sendUserIdAsHeader: true,
    });

    // Split the codes into chunks and create a request for each chunk
    for (let i = 0; i < requestsCount; i++) {
      const codesChunk = codeList.slice(
        i * MAX_CODES_PER_REQUEST,
        (i + 1) * MAX_CODES_PER_REQUEST
      );
      const codeFilter = 'code:' + codesChunk.join(',');
      const request = this.http
        .get(this.getSearchByCodesEndpoint(codeFilter), { context })
        .pipe(this.converter.pipeable(PRODUCT_SEARCH_PAGE_NORMALIZER));

      requests.push(request);
    }

    return forkJoin(requests).pipe(
      map((pages: ProductSearchPage[]) => {
        // Combine all pages into one
        const combinedPage: ProductSearchPage = {
          // Initialize with the properties of the first page
          ...pages[0],
          // Combine the products of all pages
          products: pages.flatMap((page) =>
            page.products ? page.products : []
          ),
        };
        return combinedPage;
      })
    );
  }

  loadSuggestions(
    term: string,
    pageSize: number = 3
  ): Observable<Suggestion[]> {
    return this.http
      .get<Occ.SuggestionList>(
        this.getSuggestionEndpoint(term, pageSize.toString())
      )
      .pipe(
        map((suggestionsList) => suggestionsList.suggestions ?? []),
        this.converter.pipeableMany(PRODUCT_SUGGESTION_NORMALIZER)
      );
  }

  protected getSearchEndpoint(
    query: string,
    searchConfig: SearchConfig
  ): string {
    return this.occEndpoints.buildUrl('productSearch', {
      queryParams: { query, ...searchConfig },
    });
  }

  protected getSuggestionEndpoint(term: string, max: string): string {
    return this.occEndpoints.buildUrl('productSuggestions', {
      queryParams: { term, max },
    });
  }

  protected getSearchByCodesEndpoint(
    filters: string,
    searchConfig: SearchConfig = { pageSize: 100 }
  ): string {
    return this.occEndpoints.buildUrl('productSearch', {
      queryParams: { filters, ...searchConfig },
    });
  }
}

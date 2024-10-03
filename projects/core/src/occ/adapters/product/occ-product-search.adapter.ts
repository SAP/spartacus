/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { Product } from '../../../model';
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
    searchConfig: SearchConfig = this.DEFAULT_SEARCH_CONFIG,
    scope?: string
  ): Observable<ProductSearchPage> {
    const context = new HttpContext().set(OCC_HTTP_TOKEN, {
      sendUserIdAsHeader: true,
    });

    return this.http
      .get(this.getSearchEndpoint(query, searchConfig, scope), { context })
      .pipe(
        this.converter.pipeable(PRODUCT_SEARCH_PAGE_NORMALIZER),
        tap(
          (productSearchPage) =>
            productSearchPage.keywordRedirectUrl &&
            this.router?.navigate([productSearchPage.keywordRedirectUrl])
        )
      );
  }

  searchByCodes(
    codes: string[],
    scope?: string
  ): Observable<{ products: Product[] }> {
    if (codes.length === 0) {
      return of({ products: [] });
    }

    const CHUNK_SIZE = 100; // Max limit of ProductSearch OCC
    const codesChunks = []; //split array of codes into chunks of max size

    for (let i = 0; i < codes.length; i += CHUNK_SIZE) {
      codesChunks.push(codes.slice(i, i + CHUNK_SIZE));
    }

    const chunksResults$: Observable<{ products: Product[] }>[] =
      codesChunks.map((codesChunk) => {
        const searchConfig: SearchConfig = {
          filters: `code:${codesChunk.join(',')}`,
          pageSize: CHUNK_SIZE,
        };

        return this.search('', searchConfig, scope).pipe(
          map((productSearchPage) => ({
            products: productSearchPage?.products ?? [],
          }))
        );
      });

    return forkJoin(chunksResults$).pipe(
      map((chunksResults) => ({
        products: chunksResults.flatMap((chunkResult) => chunkResult.products),
      }))
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
    searchConfig: SearchConfig,
    scope?: string
  ): string {
    return this.occEndpoints.buildUrl('productSearch', {
      queryParams: { query, ...searchConfig },
      scope,
    });
  }

  protected getSuggestionEndpoint(term: string, max: string): string {
    return this.occEndpoints.buildUrl('productSuggestions', {
      queryParams: { term, max },
    });
  }
}

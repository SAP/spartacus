/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BundleSearchParams, ProductSearchPage } from '../../../model/product-search.model';
import { PRODUCT_SEARCH_PAGE_NORMALIZER } from '../../../product/connectors/search/converters';
import { SearchConfig } from '../../../product/model/search-config';
import { ConverterService } from '../../../util/converter.service';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { OCC_HTTP_TOKEN } from '../../utils';
import { BundleAdapter } from '../../../product/connectors/bundle/bundle.adapter';

@Injectable()
export class OccBundleAdapter implements BundleAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  readonly DEFAULT_SEARCH_CONFIG: SearchConfig = {
    pageSize: 20,
  };

  getAllowedProducts(
    urlParams: BundleSearchParams,
    query: string,
    searchConfig: SearchConfig = this.DEFAULT_SEARCH_CONFIG
  ): Observable<ProductSearchPage> {
    const context = new HttpContext().set(OCC_HTTP_TOKEN, {
      sendUserIdAsHeader: true,
    });

    return this.http
      .get(
        this.getBundleAllowedProductsSearchEndpoint(
          urlParams,
          query,
          searchConfig
        ),
        {
          context,
        }
      )
      .pipe(this.converter.pipeable(PRODUCT_SEARCH_PAGE_NORMALIZER));
  }

  /**
   * Get bundle endpoint
   * @param urlParams include userId: string, cartId: string entryGroupNumber: number
   * @param query query
   * @param searchConfig config
   * @returns endpoint
   */
  protected getBundleAllowedProductsSearchEndpoint(
    urlParams: BundleSearchParams,
    query: string,
    searchConfig: SearchConfig
  ): string {
    return this.occEndpoints.buildUrl('bundleAllowedProductsSearch', {
      urlParams,
      queryParams: { query, ...searchConfig },
    });
  }
}

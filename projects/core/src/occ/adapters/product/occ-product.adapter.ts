/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { Product } from '../../../model/product.model';
import { PRODUCT_NORMALIZER } from '../../../product/connectors/product/converters';
import { ProductAdapter } from '../../../product/connectors/product/product.adapter';
import { ScopedProductData } from '../../../product/connectors/product/scoped-product-data';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { ScopedDataWithUrl } from '../../services/occ-fields.service';
import { OccRequestsOptimizerService } from '../../services/occ-requests-optimizer.service';
import { OCC_HTTP_TOKEN } from '../../utils';

@Injectable()
export class OccProductAdapter implements ProductAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService,
    protected requestsOptimizer: OccRequestsOptimizerService
  ) {}

  load(productCode: string, scope?: string): Observable<Product> {
    return this.http
      .get(this.getEndpoint(productCode, scope))
      .pipe(this.converter.pipeable(PRODUCT_NORMALIZER));
  }

  loadMany(products: ScopedProductData[]): ScopedProductData[] {
    // SPIKE TODO: ADD SPLITTING BY 100 PRODUCT CODES

    // SPIKE NEW
    // SPIKE TODO - now checking only first product, should be all
    if (products.length && products[0].scope === 'carouselSearchByCodes') {
      const scope = 'carouselSearchByCodes';
      const productCodes = products.map((product) => product.code);
      const url = this.occEndpoints.buildUrl('product', {
        urlParams: { productCodes },
        queryParams: { pageSize: 100 }, // SPIKE TODO HARDCODED, WE NEED TO FETCH MORE
        scope,
      });

      const context = new HttpContext().set(OCC_HTTP_TOKEN, {
        sendUserIdAsHeader: true,
      });
      const response$: Observable<Product[]> = this.http
        .get<{ products: Occ.Product[] }>(url, { context })
        .pipe(
          map((response) => response.products),
          this.converter.pipeableMany(PRODUCT_NORMALIZER),
          shareReplay({ bufferSize: 1, refCount: true })
        );
      // I want to convert it to array of ScopedProductData, where each object contains a relevant product `code` and its fetched `$data`
      return products.map((product) => ({
        code: product.code,

        // SPIKE OLD: - not using `find()`:
        // data$: response$.pipe(map((products) => products[index])),

        // SPIKE NEW - USING `find()`:
        data$: response$.pipe(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- SPIKE TODO IT"S NOT GUARANTEED TO RETURN ANYTHING
          map((_products) => _products.find((p) => p.code === product.code)!)
        ),
        scope,
      }));
    }

    const scopedDataWithUrls: ScopedDataWithUrl[] = products.map((model) => ({
      scopedData: model,
      url: this.getEndpoint(model.code, model.scope),
    }));

    return this.requestsOptimizer
      .scopedDataLoad<Occ.Product>(scopedDataWithUrls)
      .map(
        (scopedProduct) =>
          ({
            ...scopedProduct,
            data$: scopedProduct.data$?.pipe(
              this.converter.pipeable(PRODUCT_NORMALIZER)
            ),
          }) as ScopedProductData
      );
  }

  protected getEndpoint(code: string, scope?: string): string {
    return this.occEndpoints.buildUrl('product', {
      urlParams: { productCode: code },
      scope,
    });
  }
}

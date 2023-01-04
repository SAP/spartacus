/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AsmAdapter,
  AsmConfig,
  CustomerSearchOptions,
  CustomerSearchPage,
  CUSTOMER_LISTS_NORMALIZER,
  CUSTOMER_SEARCH_PAGE_NORMALIZER,
} from '@spartacus/asm/core';
import {
  AsmCustomer360Response,
  AsmCustomer360Type,
  BindCartParams,
  CustomerListsPage,
} from '@spartacus/asm/root';
import {
  BaseSiteService,
  ConverterService,
  InterceptorUtil,
  normalizeHttpError,
  OccEndpointsService,
  USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
} from '@spartacus/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
//
import { of } from 'rxjs';

@Injectable()
export class OccAsmAdapter implements AsmAdapter {
  private activeBaseSite: string;

  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService,
    protected config: AsmConfig,
    protected baseSiteService: BaseSiteService
  ) {
    this.baseSiteService
      .getActive()
      .subscribe((value) => (this.activeBaseSite = value));
  }

  protected getHeaders(): HttpHeaders {
    return InterceptorUtil.createHeader(
      USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
      true,
      new HttpHeaders()
    );
  }

  customerLists(): Observable<CustomerListsPage> {
    const headers = this.getHeaders();
    const params: HttpParams = new HttpParams().set(
      'baseSite',
      this.activeBaseSite
    );

    const url = this.occEndpointsService.buildUrl(
      'asmCustomerLists',
      {},
      {
        baseSite: false,
        prefix: false,
      }
    );

    return this.http.get<CustomerListsPage>(url, { headers, params }).pipe(
      catchError((error) => throwError(normalizeHttpError(error))),
      this.converterService.pipeable(CUSTOMER_LISTS_NORMALIZER)
    );
  }

  customerSearch(
    options: CustomerSearchOptions
  ): Observable<CustomerSearchPage> {
    const headers = this.getHeaders();
    let params: HttpParams = new HttpParams().set(
      'baseSite',
      this.activeBaseSite
    );

    if (options.sort !== undefined) {
      params = params.set('sort', options.sort);
    } else {
      if (!options.customerListId) {
        params = params.set('sort', 'byNameAsc');
      }
    }

    if (options.query !== undefined) {
      params = params.set('query', options.query);
    }

    if (options.pageSize !== undefined) {
      params = params.set('pageSize', options.pageSize.toString());
    }

    if (options.currentPage !== undefined) {
      params = params.set('currentPage', options.currentPage.toString());
    }

    if (options.customerListId !== undefined) {
      params = params.set('customerListId', options.customerListId);
    }

    const url = this.occEndpointsService.buildUrl(
      'asmCustomerSearch',
      {},
      {
        baseSite: false,
        prefix: false,
      }
    );

    return this.http.get<CustomerSearchPage>(url, { headers, params }).pipe(
      catchError((error) => throwError(normalizeHttpError(error))),
      this.converterService.pipeable(CUSTOMER_SEARCH_PAGE_NORMALIZER)
    );
  }

  bindCart({ cartId, customerId }: BindCartParams): Observable<unknown> {
    const headers = InterceptorUtil.createHeader(
      USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
      true,
      new HttpHeaders()
    );
    const params: HttpParams = new HttpParams()
      .set('baseSite', this.activeBaseSite)
      .set('cartId', cartId)
      .set('customerId', customerId);

    const url = this.occEndpointsService.buildUrl(
      'asmBindCart',
      {},
      {
        baseSite: false,
        prefix: false,
      }
    );

    return this.http
      .post<void>(url, {}, { headers, params })
      .pipe(catchError((error) => throwError(normalizeHttpError(error))));
  }

  getCustomer360Data(/* queries: Array<AsmCustomer360Query>, { userId }: AsmCustomer360Params */): Observable<AsmCustomer360Response> {
    /*
    const headers = InterceptorUtil.createHeader(
      USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
      true,
      new HttpHeaders()
    );

    const url = this.occEndpointsService.buildUrl(
      'asmCustomer360',
      {
        urlParams: {
          baseSiteId: this.activeBaseSite,
          userId,
        },
      },
      {
        baseSite: false,
        prefix: false,
      }
    );

    const requestBody = {
      customer360Queries: queries,
    };
    */

    // return this.http.post<AsmCustomer360Response>(url, requestBody, { headers });

    const response: AsmCustomer360Response = {
      value: [
        {
          type: AsmCustomer360Type.REVIEW_LIST,
          reviews: [
            {
              productName: 'DC Car Battery Adapter',
              productCode: '107701',
              rating: '0.5',
              reviewStatus: 'pending',
              reviewText: 'Adapter? More like Badapter!!!',
              createdAt: '2022-05-15T18:25:43.511Z',
              updatedAt: '',
            },
            {
              productName: 'VCT-D580RM Remote Control Tripod',
              productCode: '2992',
              rating: '4.5',
              reviewStatus: 'pending',
              reviewText: 'Flimsy stand!',
              createdAt: '2022-06-22T18:25:43.511Z',
              updatedAt: '',
            },
            {
              productName: 'Mini T-Cam',
              productCode: '458542',
              rating: '1',
              reviewStatus: 'pending',
              reviewText: 'Webcam bad',
              createdAt: '2022-07-02T18:25:43.511Z',
              updatedAt: '',
            },
            {
              productName: 'HDR-CX105E Red',
              productCode: '1934406',
              rating: '1.5',
              reviewStatus: 'pending',
              reviewText: 'First review',
              createdAt: '2022-07-03T18:25:43.511Z',
              updatedAt: '',
            },
            {
              productName: 'DC Car Battery Adapter',
              productCode: '10770',
              rating: '2.5',
              reviewStatus: 'pending',
              reviewText: 'Adapter? More like Badapter!!!',
              createdAt: '2022-05-15T18:25:43.511Z',
              updatedAt: '',
            },
            {
              productName: 'VCT-D580RM Remote Control Tripod',
              productCode: '29925',
              rating: '3.5',
              reviewStatus: 'pending',
              reviewText: 'Flimsy stand!',
              createdAt: '2022-06-22T18:25:43.511Z',
              updatedAt: '',
            },
            {
              productName: 'Mini T-Cam',
              productCode: '4585',
              rating: '4',
              reviewStatus: 'pending',
              reviewText: 'Webcam bad',
              createdAt: '2022-07-02T18:25:43.511Z',
              updatedAt: '',
            },
            {
              productName: 'HDR-CX105E Red',
              productCode: '19406',
              rating: '3',
              reviewStatus: 'pending',
              reviewText: 'First review',
              createdAt: '2022-07-03T18:25:43.511Z',
              updatedAt: '',
            },
          ],
        },
        {
          type: AsmCustomer360Type.STORE_LOCATION,
          address: 'New York United States 10001',
        },
      ],
    };

    return of(response);
  }
}

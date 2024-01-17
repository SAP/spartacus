/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggerService } from '../../../logger';
import {
  NotificationType,
  ProductInterestEntryRelation,
  ProductInterestSearchResult,
} from '../../../model/product-interest.model';
import { PRODUCT_INTERESTS_NORMALIZER } from '../../../user/connectors/interests/converters';
import { UserInterestsAdapter } from '../../../user/connectors/interests/user-interests.adapter';
import { ConverterService } from '../../../util/converter.service';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { OccConfig } from '../../config/occ-config';
import { OccEndpointsService } from '../../services/occ-endpoints.service';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});

@Injectable()
export class OccUserInterestsAdapter implements UserInterestsAdapter {
  protected logger = inject(LoggerService);

  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected config: OccConfig,
    protected converter: ConverterService
  ) {}

  public getInterests(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string,
    productCode?: string,
    notificationType?: NotificationType
  ): Observable<ProductInterestSearchResult> {
    let params = new HttpParams().set('sort', sort ? sort : 'name:asc');
    if (pageSize) {
      params = params.set('pageSize', pageSize.toString());
    }
    if (currentPage) {
      params = params.set('currentPage', currentPage.toString());
    }
    if (productCode) {
      params = params.set('productCode', productCode);
    }
    if (notificationType) {
      params = params.set('notificationType', notificationType.toString());
    }

    return this.http
      .get(
        this.occEndpoints.buildUrl('getProductInterests', {
          urlParams: { userId },
        }),
        {
          headers,
          params,
        }
      )
      .pipe(
        this.converter.pipeable(PRODUCT_INTERESTS_NORMALIZER),
        catchError((error: any) => {
          throw normalizeHttpError(error, this.logger);
        })
      );
  }

  public removeInterest(
    userId: string,
    item: ProductInterestEntryRelation
  ): Observable<any[]> {
    const r: Observable<any>[] = [];
    item.productInterestEntry?.forEach((entry: any) => {
      const params: HttpParams = new HttpParams()
        .set('productCode', item.product?.code ?? '')
        .set('notificationType', entry.interestType);
      r.push(
        this.http
          .delete(
            this.occEndpoints.buildUrl('productInterests', {
              urlParams: { userId },
            }),
            {
              params: params,
            }
          )
          .pipe(
            catchError((error: any) => {
              throw normalizeHttpError(error, this.logger);
            })
          )
      );
    });
    return forkJoin(r);
  }

  public addInterest(
    userId: string,
    productCode: string,
    notificationType: NotificationType
  ): Observable<any> {
    const params = new HttpParams()
      .set('productCode', productCode)
      .set('notificationType', notificationType.toString());
    return this.http
      .post(
        this.occEndpoints.buildUrl('productInterests', {
          urlParams: { userId },
        }),
        {},
        {
          headers,
          params,
        }
      )
      .pipe(
        catchError((error: any) => {
          throw normalizeHttpError(error, this.logger);
        })
      );
  }
}

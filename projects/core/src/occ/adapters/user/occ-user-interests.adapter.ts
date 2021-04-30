import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { Observable, throwError, forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserInterestsAdapter } from '../../../user/connectors/interests/user-interests.adapter';
import {
  ProductInterestSearchResult,
  ProductInterestEntryRelation,
  NotificationType,
} from '../../../model/product-interest.model';
import { OccConfig } from '../../config/occ-config';
import { ConverterService } from '../../../util/converter.service';
import { PRODUCT_INTERESTS_NORMALIZER } from '../../../user/connectors/interests/converters';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});

@Injectable()
export class OccUserInterestsAdapter implements UserInterestsAdapter {
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
        catchError((error: any) => throwError(error))
      );
  }

  public removeInterest(
    userId: string,
    item: ProductInterestEntryRelation
  ): Observable<any[]> {
    const r: Observable<any>[] = [];
    item.productInterestEntry.forEach((entry: any) => {
      const params: HttpParams = new HttpParams()
        .set('productCode', item.product.code)
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
          .pipe(catchError((error: any) => throwError(error)))
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
      .pipe(catchError((error: any) => throwError(error)));
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  LoggerService,
  OccEndpointsService,
  tryNormalizeHttpError,
} from '@spartacus/core';
import { SubscriptionBillingAdapter } from '@spartacus/subscription-billing/core';
import {
  SubscriptionDetail,
  SubscriptionExtensionEffectiveDate,
  SubscriptionList,
} from '@spartacus/subscription-billing/root';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class OccSubscriptionBillingAdapter
  implements SubscriptionBillingAdapter
{
  protected logger = inject(LoggerService);
  protected http = inject(HttpClient);
  protected occEndpoints = inject(OccEndpointsService);
  getSubscriptionByCode(
    userId: string,
    subscriptionCode: string
  ): Observable<SubscriptionDetail> {
    const url = this.occEndpoints.buildUrl('subscriptionByCode', {
      urlParams: {
        userId,
        subscriptionCode,
      },
    });
    return this.http.get<SubscriptionDetail>(url).pipe(
      catchError((error) => {
        throw tryNormalizeHttpError(error, this.logger);
      })
    );
  }

  getSubscriptionList(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<SubscriptionList> {
    const url = this.occEndpoints.buildUrl('subscriptionList', {
      urlParams: {
        userId,
      },
      queryParams: {
        pageSize,
        currentPage,
        sort,
      },
    });
    return this.http.get<SubscriptionList>(url).pipe(
      catchError((error) => {
        throw tryNormalizeHttpError(error, this.logger);
      })
    );
  }

  getSubscriptionExtensionEffectiveDate(
    userId: string,
    subscriptionCode: string,
    durationInMonth: number | null, 
    unlimited: boolean
  ): Observable<SubscriptionExtensionEffectiveDate> {
    const url = this.occEndpoints.buildUrl('extensionEffectiveDate', {
      urlParams: {
        userId,
        subscriptionCode,
      },
    });
    const requestBody = {
      numberOfBillingCycles: durationInMonth,
      unlimited,
    }
    return this.http
      .post<SubscriptionExtensionEffectiveDate>(url, requestBody)
      .pipe(
        catchError((error) => {
          throw tryNormalizeHttpError(error, this.logger);
        })
      );
  }

  extendSubscription(
    userId: string,
    subscriptionCode: string,
    durationInMonth: number | null, 
    unlimited: boolean
  ): Observable<any> {
    const url = this.occEndpoints.buildUrl('extendSubscription', {
      urlParams: {
        userId,
        subscriptionCode,
      },
    });
    const requestBody = {
      numberOfBillingCycles: durationInMonth,
      unlimited,
    }
    console.log('extendSubscription requestBody', requestBody, url);
    return this.http
      .post<any>(url, requestBody)
      .pipe(
        catchError((error) => {
          throw tryNormalizeHttpError(error, this.logger);
        })
      );
  }
}

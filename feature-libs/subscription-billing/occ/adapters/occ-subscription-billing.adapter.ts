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
  SubscriptionList,
} from '@spartacus/subscription-billing/root';
import { catchError, Observable, of } from 'rxjs';

@Injectable()
export class OccSubscriptionBillingAdapter
  implements SubscriptionBillingAdapter
{
  protected logger = inject(LoggerService);
  protected http = inject(HttpClient);
  protected occEndpoints = inject(OccEndpointsService);
  getSubscriptionDetail(
    _userId: string,
    _subscriptionCode: string
  ): Observable<SubscriptionDetail> {
    return of({});
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
}

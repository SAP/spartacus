import { inject, Injectable } from '@angular/core';
import { RescheduleServiceOrderAdapter } from '../../core/connector/reschedule-service-order.adapter';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  LoggerService,
  normalizeHttpError,
  OccEndpointsService,
} from '@spartacus/core';
import { ServiceDetails } from '@spartacus/s4-service/root';
import { catchError, Observable } from 'rxjs';

const CONTENT_TYPE_JSON_HEADER = { 'Content-Type': 'application/json' };

@Injectable()
export class OccRescheduleServiceOrderAdapter
  implements RescheduleServiceOrderAdapter
{
  protected http = inject(HttpClient);
  protected logger = inject(LoggerService);
  protected occEndpoints = inject(OccEndpointsService);

  rescheduleServiceOrder(
    userId: string,
    code: string,
    scheduledAt: ServiceDetails
  ): Observable<unknown> {
    const url = this.occEndpoints.buildUrl('rescheduleService', {
      urlParams: { userId, code },
    });
    const headers = new HttpHeaders({
      ...CONTENT_TYPE_JSON_HEADER,
    });
    return this.http.patch(url, scheduledAt, { headers }).pipe(
      catchError((error: any) => {
        throw normalizeHttpError(error, this.logger);
      })
    );
  }
}

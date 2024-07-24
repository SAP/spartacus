import { inject, Injectable } from '@angular/core';
import { RescheduleServiceOrderAdapter } from '../../core/connector/reschedule-service-order.adapter';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OccEndpointsService } from '@spartacus/core';
import { ServiceDetails } from '@spartacus/s4-service/root';
import { Observable } from 'rxjs';
const CONTENT_TYPE_JSON_HEADER = { 'Content-Type': 'application/json' };

@Injectable()
export class OccRescheduleServiceOrderAdapter implements RescheduleServiceOrderAdapter {
  protected http = inject(HttpClient);
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
    //check if we need to add serializer and normalizer.
    console.log('occ -> adapter level', url, scheduledAt);
    return this.http.patch(url, scheduledAt, { headers });
  }
}

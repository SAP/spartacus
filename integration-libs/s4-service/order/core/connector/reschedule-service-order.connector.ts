import { inject, Injectable } from '@angular/core';
import { RescheduleServiceOrderAdapter } from './reschedule-service-order.adapter';
import { ServiceDetails } from '@spartacus/s4-service/root';
import { Observable } from 'rxjs';

@Injectable()
export class ReschedleServiceOrderConnector {
  protected rescheduleServiceOrderadapter = inject(RescheduleServiceOrderAdapter);

  rescheduleServiceOrder(
    userId: string,
    cartId: string,
    scheduledAt: ServiceDetails
  ): Observable<unknown> {
    return this.rescheduleServiceOrderadapter.rescheduleServiceOrder(userId, cartId, scheduledAt);
  }
}

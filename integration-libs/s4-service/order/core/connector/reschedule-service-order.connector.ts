import { inject, Injectable } from '@angular/core';
import { RescheduleServiceOrderAdapter } from './reschedule-service-order.adapter';
import { ServiceDetails } from '@spartacus/s4-service/root';
import { Observable } from 'rxjs';

@Injectable()
export class RescheduleServiceOrderConnector {
  protected rescheduleServiceOrderadapter = inject(RescheduleServiceOrderAdapter);

  rescheduleServiceOrder(
    userId: string,
    code: string,
    scheduledAt: ServiceDetails
  ): Observable<unknown> {
    console.log('Core -> connector level ', scheduledAt);
    return this.rescheduleServiceOrderadapter.rescheduleServiceOrder(userId, code, scheduledAt);
  }
}

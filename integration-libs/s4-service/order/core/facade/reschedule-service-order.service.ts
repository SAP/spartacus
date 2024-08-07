import { inject, Injectable } from '@angular/core';
import { RescheduleServiceOrderConnector } from '../connector';
import {
  RescheduleServiceOrderFacade,
  ServiceDateTime,
} from '@spartacus/s4-service/root';
import { UserIdService } from '@spartacus/core';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RescheduleServiceOrderService
  implements RescheduleServiceOrderFacade
{
  protected rescheduleServiceOrderConnector = inject(
    RescheduleServiceOrderConnector
  );
  protected userIdService = inject(UserIdService);

  constructor() {}

  rescheduleService(orderCode: string, scheduledAt: ServiceDateTime) {
    return this.userIdService.takeUserId().pipe(
      switchMap((userId) => {
        return this.rescheduleServiceOrderConnector.rescheduleServiceOrder(
          userId,
          orderCode,
          { scheduledAt }
        );
      })
    );
  }
}

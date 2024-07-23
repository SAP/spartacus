import { inject, Injectable } from '@angular/core';
import { RescheduleServiceOrderConnector } from '../connector';
import { RescheduleServiceOrderFacade, ServiceDateTime } from '@spartacus/s4-service/root';
import { UserIdService } from '@spartacus/core';
import { switchMap } from 'rxjs/operators';
import { OrderDetailsService } from '@spartacus/order/components';

@Injectable({
  providedIn: 'root'
})
export class RescheduleServiceOrderService implements RescheduleServiceOrderFacade {
  protected rescheduleServiceOrderConnector = inject(RescheduleServiceOrderConnector);
  protected orderDetailsService = inject(OrderDetailsService);
  protected userIdService = inject(UserIdService);

  constructor() { }

  rescheduleService(orderCode: string, scheduledAt: ServiceDateTime) {
    console.log('Facade -> service level time ', scheduledAt);
    return this.userIdService.takeUserId().pipe(
      switchMap((userId) => {
        console.log('Facade -> service level user ID ', userId);
        return this.rescheduleServiceOrderConnector.rescheduleServiceOrder(
          userId,
          orderCode,
          { scheduledAt }
        );
      })
    );
  }

  loadOrderDetails() {
    return this.orderDetailsService.getOrderDetails();
  }
}

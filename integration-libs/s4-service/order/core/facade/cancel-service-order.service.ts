import { inject, Injectable } from '@angular/core';
import { CancelServiceOrderConnector } from '../connector';
import {
  CancelObj,
  CancelServiceOrderFacade,
} from '@spartacus/s4-service/root';
import { OrderHistoryFacade } from '@spartacus/order/root';
import { UserIdService } from '@spartacus/core';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CancelServiceOrderService implements CancelServiceOrderFacade {
  protected cancelServiceOrderConnector = inject(CancelServiceOrderConnector);
  protected orderHistoryFacade = inject(OrderHistoryFacade);
  protected userIdService = inject(UserIdService);

  constructor() {}

  cancelService(orderCode: string, cancelObj: CancelObj) {
    return this.userIdService.takeUserId().pipe(
      switchMap((userId) => {
        return this.cancelServiceOrderConnector.cancelServiceOrder(
          userId,
          orderCode,
          cancelObj
        );
      })
    );
  }

  loadOrderDetails() {
    return this.orderHistoryFacade.getOrderDetails();
  }
}

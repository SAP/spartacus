import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { OrderDetailsService } from '@spartacus/order/components';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceOrderGuard {
  constructor(
    protected orderDetailsService: OrderDetailsService,
    protected globalMessageService: GlobalMessageService
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.orderDetailsService.getOrderDetails().pipe(
      map((orderDetails) => {
        if (orderDetails && orderDetails.serviceReschedulable) {
          return true;
        } else {
          this.globalMessageService.add(
            { key: 'rescheduleService.serviceNotReschedulable' },
            GlobalMessageType.MSG_TYPE_ERROR
          );
          return false;
        }
      })
    );
  }
}

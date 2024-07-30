import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { GlobalMessageService, GlobalMessageType, SemanticPathService } from '@spartacus/core';
import { OrderDetailsService } from '@spartacus/order/components';
// import { OrderFacade } from '@spartacus/order/root';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceOrderGuard {
  constructor(
    protected orderDetailsService: OrderDetailsService,
    protected router: Router,
    protected semanticPathService: SemanticPathService,
    protected globalMessageService: GlobalMessageService
  ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.orderDetailsService.getOrderDetails().pipe(
      map((orderDetails) => {
        console.log('Order details: ', orderDetails);
        if (orderDetails && orderDetails.serviceReschedulable) {
          return true;
        } else {
          // return true;
          this.globalMessageService.add(
            { key: 'rescheduleService.serviceNotReschedulable' },
            GlobalMessageType.MSG_TYPE_ERROR
          );
          return this.router.parseUrl(
            this.semanticPathService.get('orders') ?? ''
          );
        }
      })
    );
  }
}



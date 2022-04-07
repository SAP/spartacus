import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { SemanticPathService } from '@spartacus/core';
import { OrderHistoryFacade } from 'feature-libs/order/root/facade/order-history.facade';
import { Order } from 'feature-libs/order/root/model/order.model';
import { map } from 'rxjs/operators';
import { OrderDetailsService } from '../order-details/order-details.service';

@Injectable({
  providedIn: 'root',
})
export class OrderHistoryDetailsGuard implements CanActivate {
  constructor(
    protected orderDetailsService: OrderDetailsService,
    protected router: Router,
    protected semanticPathService: SemanticPathService,
    protected orderHistoryFacade: OrderHistoryFacade
  ) {}

  canActivate(activatedRoute: ActivatedRouteSnapshot): any {
    const orderCode = activatedRoute.params?.orderCode;

    if (!orderCode) {
      return this.redirect();
    }

    return this.orderHistoryFacade.getOrder(orderCode).pipe(
      map((order: Order) => {
        if (Object.keys(order).length !== 0) {
          return true;
        } else {
          return this.redirect();
        }
      })
    );
  }

  protected redirect(): UrlTree {
    return this.router.createUrlTree(
      this.semanticPathService.transform({
        cxRoute: 'orders',
      })
    );
  }
}

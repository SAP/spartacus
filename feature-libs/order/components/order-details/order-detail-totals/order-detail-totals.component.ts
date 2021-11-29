import { Component } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/main/root';
import {
  Order,
  OrderDetailsContext,
  ORDER_DETAILS_CONTEXT,
} from '@spartacus/order/root';
import { ContextService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-order-details-totals',
  templateUrl: './order-detail-totals.component.html',
})
export class OrderDetailTotalsComponent {
  constructor(protected contextService: ContextService) {}

  protected orderDetailsContext$: Observable<OrderDetailsContext | undefined> =
    this.contextService.get<OrderDetailsContext>(ORDER_DETAILS_CONTEXT);

  order$: Observable<Order | undefined> = this.orderDetailsContext$.pipe(
    switchMap(
      (orderDetailsContext) =>
        orderDetailsContext?.getOrderDetails?.() ?? of(undefined)
    )
  );

  readonly CartOutlets = CartOutlets;
}

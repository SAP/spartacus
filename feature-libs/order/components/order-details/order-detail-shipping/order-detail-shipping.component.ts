import { Component } from '@angular/core';
import {
  OrderDetailsContext,
  ORDER_DETAILS_CONTEXT,
} from '@spartacus/order/root';
import { ContextService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-order-details-shipping',
  templateUrl: './order-detail-shipping.component.html',
})
export class OrderDetailShippingComponent {
  constructor(protected contextService: ContextService) {}

  protected orderDetailsContext$: Observable<OrderDetailsContext | undefined> =
    this.contextService.get<OrderDetailsContext>(ORDER_DETAILS_CONTEXT);

  order$: Observable<any> = this.orderDetailsContext$.pipe(
    switchMap(
      (orderDetailsContext) =>
        orderDetailsContext?.getOrderDetails?.() ?? of(undefined)
    )
  );
}

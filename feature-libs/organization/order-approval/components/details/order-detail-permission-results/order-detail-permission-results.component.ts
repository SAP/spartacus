import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  Order,
  OrderDetailsContext,
  ORDER_DETAILS_CONTEXT,
} from '@spartacus/order/root';
import { ContextService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-order-detail-permission-results',
  templateUrl: './order-detail-permission-results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailPermissionResultsComponent {
  constructor(protected contextService: ContextService) {}

  protected orderDetailsContext$: Observable<OrderDetailsContext | undefined> =
    this.contextService.get<OrderDetailsContext>(ORDER_DETAILS_CONTEXT);

  order$: Observable<Order | undefined> = this.orderDetailsContext$.pipe(
    switchMap(
      (orderDetailsContext) =>
        orderDetailsContext?.getOrderDetails?.() ?? of(undefined)
    )
  );
}

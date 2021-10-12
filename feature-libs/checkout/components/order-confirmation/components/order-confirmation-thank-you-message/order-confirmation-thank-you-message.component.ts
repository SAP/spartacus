import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CheckoutFacade } from '@spartacus/checkout/root';
import { Order, ORDER_TYPE } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-order-confirmation-thank-you-message',
  templateUrl: './order-confirmation-thank-you-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmationThankYouMessageComponent
  implements OnInit, OnDestroy
{
  order$: Observable<Order | undefined>;
  isReplenishmentOrderType$: Observable<boolean>;

  isGuestCustomer = false;
  orderGuid: string | undefined;

  constructor(protected checkoutService: CheckoutFacade) {}

  ngOnInit() {
    this.order$ = this.checkoutService.getOrder().pipe(
      tap((order) => {
        this.isGuestCustomer =
          order && 'guestCustomer' in order
            ? order.guestCustomer ?? false
            : false;
        this.orderGuid = order?.guid;
      })
    );

    this.isReplenishmentOrderType$ = this.checkoutService
      .getOrderType()
      .pipe(
        map(
          (orderType) => ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER === orderType
        )
      );
  }

  ngOnDestroy() {
    this.checkoutService.clearOrder();
  }
}

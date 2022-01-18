import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CheckoutFacade } from '@spartacus/checkout/root';
import { ORDER_TYPE } from '@spartacus/core';
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
  order$: Observable<any>;
  isReplenishmentOrderType$: Observable<boolean>;

  isGuestCustomer = false;
  orderGuid: string;

  constructor(protected checkoutService: CheckoutFacade) {}

  ngOnInit() {
    this.order$ = this.checkoutService.getOrderDetails().pipe(
      tap((order) => {
        this.isGuestCustomer =
          'guestCustomer' in order ? order.guestCustomer ?? false : false;
        this.orderGuid = order.guid as string;
      })
    );

    this.isReplenishmentOrderType$ = this.checkoutService
      .getCurrentOrderType()
      .pipe(
        map(
          (orderType) => ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER === orderType
        )
      );
  }

  ngOnDestroy() {
    this.checkoutService.clearCheckoutData();
  }
}

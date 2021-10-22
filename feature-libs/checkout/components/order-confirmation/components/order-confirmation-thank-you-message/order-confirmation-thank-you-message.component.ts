import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CheckoutFacade } from '@spartacus/checkout/root';
import {
  ORDER_TYPE,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { Observable, combineLatest } from 'rxjs';
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

  constructor(
    protected checkoutService: CheckoutFacade,
    private globalMessageService: GlobalMessageService
  ) {}

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

    combineLatest([this.isReplenishmentOrderType$, this.order$])
      .subscribe(([isReplenishmentOrderType, order]) => {
        let code = isReplenishmentOrderType
          ? order.replenishmentOrderCode
          : order.code;

        this.globalMessageService.add(
          {
            key: 'checkoutOrderConfirmation.successfullMessage',
            params: { number: code },
          },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      })
      .unsubscribe();
  }

  ngOnDestroy() {
    this.checkoutService.clearCheckoutData();
  }
}

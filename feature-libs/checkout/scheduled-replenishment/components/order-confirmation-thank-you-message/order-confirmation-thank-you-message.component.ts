import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { OrderConfirmationThankYouMessageComponent } from '@spartacus/checkout/components';
import { CheckoutFacade } from '@spartacus/checkout/root';
import { CheckoutScheduledReplenishmentFacade } from '@spartacus/checkout/scheduled-replenishment/root';
import { ORDER_TYPE } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-order-confirmation-thank-you-message',
  templateUrl: './order-confirmation-thank-you-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduledReplenishmentOrderConfirmationThankYouMessageComponent
  extends OrderConfirmationThankYouMessageComponent
  implements OnInit, OnDestroy
{
  isReplenishmentOrderType$: Observable<boolean>;

  constructor(
    protected checkoutService: CheckoutFacade,
    protected checkoutScheduledReplenishmentService: CheckoutScheduledReplenishmentFacade
  ) {
    super(checkoutService);
  }

  ngOnInit() {
    super.ngOnInit();

    this.isReplenishmentOrderType$ = this.checkoutScheduledReplenishmentService
      .getOrderType()
      .pipe(
        map(
          (orderType) => ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER === orderType
        )
      );
  }
}

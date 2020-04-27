import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CheckoutService, Order } from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-order-confirmation-thank-you-message',
  templateUrl: './order-confirmation-thank-you-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmationThankYouMessageComponent
  implements OnInit, OnDestroy {
  order$: Observable<Order>;
  isGuestCustomer = false;
  orderGuid: string;

  constructor(protected checkoutService: CheckoutService) {}

  ngOnInit() {
    this.order$ = this.checkoutService.getOrderDetails().pipe(
      tap((order) => {
        this.isGuestCustomer = order.guestCustomer;
        this.orderGuid = order.guid;
      })
    );
  }

  ngOnDestroy() {
    this.checkoutService.clearCheckoutData();
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Order, UnnamedFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-order-confirmation-thank-you-message',
  templateUrl: './unnamed-order-confirmation-thank-you-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnnamedOrderConfirmationThankYouMessageComponent
  implements OnInit, OnDestroy
{
  order$: Observable<Order | undefined>;

  isGuestCustomer = false;
  orderGuid: string | undefined;

  constructor(protected checkoutFacade: UnnamedFacade) {}

  ngOnInit(): void {
    console.log('in here');

    this.order$ = this.checkoutFacade.getCurrentOrderDetails().pipe(
      tap((order) => {
        this.isGuestCustomer =
          order && 'guestCustomer' in order
            ? order.guestCustomer ?? false
            : false;
        this.orderGuid = order?.guid;
      })
    );
  }

  ngOnDestroy() {
    this.checkoutFacade.clearCurrentOrder();
  }
}

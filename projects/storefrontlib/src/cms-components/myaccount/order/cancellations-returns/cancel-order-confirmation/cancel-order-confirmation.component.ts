import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';
import { OrderEntry } from '@spartacus/core';

import { OrderDetailsService } from '../../order-details/order-details.service';
import { OrderCancelOrReturnService } from '../cancel-or-return.service';

@Component({
  selector: 'cx-cancel-order-confirmation',
  templateUrl: './cancel-order-confirmation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CancelOrderConfirmationComponent implements OnInit, OnDestroy {
  constructor(
    protected orderDetailsService: OrderDetailsService,
    protected cancelOrReturnService: OrderCancelOrReturnService
  ) {}

  orderCode: string;
  isCancelling$ = this.cancelOrReturnService.isCancelling$;
  subscription: Subscription;

  cancelledEntries$: Observable<
    OrderEntry[]
  > = this.orderDetailsService.getOrderDetails().pipe(
    filter(order => Boolean(order.entries)),
    tap(order => (this.orderCode = order.code)),
    map(order => {
      const cancelledEntries = [];
      order.entries.forEach(entry => {
        if (this.cancelOrReturnService.isEntryCancelledOrReturned(entry)) {
          cancelledEntries.push(entry);
        }
      });
      return cancelledEntries;
    })
  );

  ngOnInit(): void {
    this.subscription = this.cancelOrReturnService.isCancelSuccess$.subscribe(
      success => {
        if (success) {
          this.cancelOrReturnService.cancelSuccess(this.orderCode);
        }
      }
    );
  }

  submit(): void {
    this.cancelOrReturnService.cancelOrder(this.orderCode);
  }

  back(): void {
    this.cancelOrReturnService.goToOrderCancelOrReturn(
      'orderCancel',
      this.orderCode
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

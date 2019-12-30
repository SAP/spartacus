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
  selector: 'cx-return-order-confirmation',
  templateUrl: './return-order-confirmation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReturnOrderConfirmationComponent implements OnInit, OnDestroy {
  constructor(
    protected orderDetailsService: OrderDetailsService,
    protected cancelOrReturnService: OrderCancelOrReturnService
  ) {}

  orderCode: string;
  isReturning$ = this.cancelOrReturnService.isReturning$;
  subscription: Subscription;

  returnedEntries$: Observable<
    OrderEntry[]
  > = this.orderDetailsService.getOrderDetails().pipe(
    filter(order => Boolean(order.entries)),
    tap(order => (this.orderCode = order.code)),
    map(order => {
      const returnedEntries = [];
      order.entries.forEach(entry => {
        if (this.cancelOrReturnService.isEntryCancelledOrReturned(entry)) {
          returnedEntries.push(entry);
        }
      });
      return returnedEntries;
    })
  );

  ngOnInit(): void {
    this.cancelOrReturnService.clearReturnRequest();
    this.subscription = this.cancelOrReturnService.isReturnSuccess$.subscribe(
      success => {
        if (success) {
          this.cancelOrReturnService.returnSuccess();
        }
      }
    );
  }

  submit(): void {
    this.cancelOrReturnService.returnOrder(this.orderCode);
  }

  back(): void {
    this.cancelOrReturnService.goToOrderCancelOrReturn(
      'orderReturn',
      this.orderCode
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

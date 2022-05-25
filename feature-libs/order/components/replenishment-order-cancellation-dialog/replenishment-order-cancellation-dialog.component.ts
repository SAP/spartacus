import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { ReplenishmentOrderHistoryFacade } from '@spartacus/order/root';
import {
  FocusConfig,
  LaunchDialogService,
  DialogComponent,
} from '@spartacus/storefront';
import { combineLatest, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'cx-replenishment-order-cancellation-dialog',
  templateUrl: './replenishment-order-cancellation-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReplenishmentOrderCancellationDialogComponent
  extends DialogComponent
  implements OnInit, OnDestroy
{
  private subscription = new Subscription();

  replenishmentOrderCode: string;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };

  constructor(
    protected replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade,
    protected globalMessageService: GlobalMessageService,
    protected launchDialogService: LaunchDialogService,
    protected el: ElementRef
  ) {
    super(launchDialogService, el);
  }

  ngOnInit(): void {
    this.subscription.add(
      combineLatest([
        this.replenishmentOrderHistoryFacade
          .getReplenishmentOrderDetails()
          .pipe(startWith(null)),
        this.launchDialogService.data$,
      ]).subscribe(([replenishmentOrder, code]) => {
        this.replenishmentOrderCode =
          code || replenishmentOrder?.replenishmentOrderCode;
      })
    );

    this.subscription.add(
      this.replenishmentOrderHistoryFacade
        .getCancelReplenishmentOrderSuccess()
        .subscribe((value) => this.onSuccess(value))
    );
  }

  onSuccess(value: boolean): void {
    if (value) {
      this.launchDialogService.closeDialog(
        'Successffully cancelled replenishment'
      );

      this.globalMessageService.add(
        {
          key: 'orderDetails.cancelReplenishment.cancelSuccess',
          params: {
            replenishmentOrderCode: this.replenishmentOrderCode,
          },
        },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    }
    this.replenishmentOrderHistoryFacade.clearCancelReplenishmentOrderProcessState();
  }

  cancelReplenishment(): void {
    this.replenishmentOrderHistoryFacade.cancelReplenishmentOrder(
      this.replenishmentOrderCode
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

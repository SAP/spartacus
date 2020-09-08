import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  UserReplenishmentOrderService,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { ICON_TYPE } from '../../../../../../cms-components/misc/icon/icon.model';
import { LaunchDialogService } from '../../../../../../layout/launch-dialog/services/launch-dialog.service';

@Component({
  selector: 'cx-replenishment-order-cancellation-dialog',
  templateUrl: './replenishment-order-cancellation-dialog.component.html',
})
export class ReplenishmentOrderCancellationDialogComponent
  implements OnInit, OnDestroy {
  private subscription = new Subscription();

  replenishmentOrderCode: string;

  iconTypes = ICON_TYPE;

  constructor(
    protected userReplenishmentOrderService: UserReplenishmentOrderService,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService,
    protected launchDialogService: LaunchDialogService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.userReplenishmentOrderService
        .getCancelReplenishmentOrderSuccess()
        .subscribe((value) => this.onSuccess(value))
    );

    this.subscription.add(
      this.userReplenishmentOrderService
        .getReplenishmentOrderDetails()
        .subscribe(
          (value) =>
            (this.replenishmentOrderCode = value.replenishmentOrderCode)
        )
    );
  }

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }

  cancelReplenishment(): void {
    this.userReplenishmentOrderService.cancelReplenishmentOrder(
      this.replenishmentOrderCode
    );
  }

  onSuccess(value: boolean): void {
    if (value) {
      this.globalMessageService.add(
        {
          key: 'orderDetails.cancelReplenishment.cancelSuccess',
          params: { replenishmentOrderCode: this.replenishmentOrderCode },
        },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
      this.routingService.go({ cxRoute: 'replenishmentOrders' });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

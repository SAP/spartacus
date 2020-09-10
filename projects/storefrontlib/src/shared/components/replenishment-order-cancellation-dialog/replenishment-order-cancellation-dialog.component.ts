import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  UserReplenishmentOrderService,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { ICON_TYPE } from '../../../cms-components/misc/icon/index';
import { LaunchDialogService } from '../../../layout/launch-dialog/services/launch-dialog.service';

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
        .getReplenishmentOrderDetails()
        .subscribe(
          (value) =>
            (this.replenishmentOrderCode = value.replenishmentOrderCode)
        )
    );

    this.subscription.add(
      this.userReplenishmentOrderService
        .getCancelReplenishmentOrderSuccess()
        .subscribe((value) => this.onSuccess(value))
    );
  }

  onSuccess(value: boolean): void {
    if (value) {
      this.routingService.go({
        cxRoute: 'replenishmentDetails',
      });
      this.globalMessageService.add(
        {
          key: 'orderDetails.cancelReplenishment.cancelSuccess',
          params: { replenishmentOrderCode: this.replenishmentOrderCode },
        },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    }
  }

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }

  cancelReplenishment(): void {
    this.userReplenishmentOrderService.cancelReplenishmentOrder(
      this.replenishmentOrderCode
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

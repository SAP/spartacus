import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  ReplenishmentOrder,
  RoutingService,
  UserReplenishmentOrderService,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { LaunchDialogService } from '../../../layout/launch-dialog/services/launch-dialog.service';

@Component({
  selector: 'cx-replenishment-order-cancellation-dialog',
  templateUrl: './replenishment-order-cancellation-dialog.component.html',
})
export class ReplenishmentOrderCancellationDialogComponent
  implements OnInit, OnDestroy {
  private subscription = new Subscription();

  replenishmentOrder: ReplenishmentOrder;

  @HostListener('click', ['$event'])
  handleClick(event: UIEvent): void {
    // Close on click outside the dialog window
    if ((event.target as any).tagName === this.el.nativeElement.tagName) {
      this.close('Cross click');
    }
  }

  constructor(
    protected userReplenishmentOrderService: UserReplenishmentOrderService,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService,
    protected launchDialogService: LaunchDialogService,
    protected el: ElementRef
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.userReplenishmentOrderService
        .getReplenishmentOrderDetails()
        .subscribe((value) => (this.replenishmentOrder = value))
    );

    this.subscription.add(
      this.userReplenishmentOrderService
        .getCancelReplenishmentOrderSuccess()
        .subscribe((value) => this.onSuccess(value))
    );
  }

  onSuccess(value: boolean): void {
    if (value) {
      this.routingService.go(
        {
          cxRoute: 'replenishmentDetails',
          params: this.replenishmentOrder,
        },
        { forced: true }
      );

      this.launchDialogService.closeDialog(
        'Succesffully cancelled replenishment'
      );

      this.globalMessageService.add(
        {
          key: 'orderDetails.cancelReplenishment.cancelSuccess',
          params: {
            replenishmentOrderCode: this.replenishmentOrder
              .replenishmentOrderCode,
          },
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
      this.replenishmentOrder.replenishmentOrderCode
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

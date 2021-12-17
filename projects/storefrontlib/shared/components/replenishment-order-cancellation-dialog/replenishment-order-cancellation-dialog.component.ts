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
  UserReplenishmentOrderService,
} from '@spartacus/core';
import { combineLatest, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { FocusConfig } from '../../../layout/a11y/keyboard-focus/keyboard-focus.model';
import { LaunchDialogService } from '../../../layout/launch-dialog/services/launch-dialog.service';

/**
 * @deprecated since 4.2 - use order lib instead
 */
@Component({
  selector: 'cx-replenishment-order-cancellation-dialog',
  templateUrl: './replenishment-order-cancellation-dialog.component.html',
})
export class ReplenishmentOrderCancellationDialogComponent
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
    protected launchDialogService: LaunchDialogService,
    protected el: ElementRef
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      combineLatest([
        this.userReplenishmentOrderService
          .getReplenishmentOrderDetails()
          .pipe(startWith(null)),
        this.launchDialogService.data$,
      ]).subscribe(([replenishmentOrder, code]) => {
        this.replenishmentOrderCode =
          code || replenishmentOrder.replenishmentOrderCode;
      })
    );

    this.subscription.add(
      this.userReplenishmentOrderService
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
    this.userReplenishmentOrderService.clearCancelReplenishmentOrderProcessState();
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

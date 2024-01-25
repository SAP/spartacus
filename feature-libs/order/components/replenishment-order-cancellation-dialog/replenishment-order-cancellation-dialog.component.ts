/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { ReplenishmentOrderHistoryFacade } from '@spartacus/order/root';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { combineLatest, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'cx-replenishment-order-cancellation-dialog',
  templateUrl: './replenishment-order-cancellation-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReplenishmentOrderCancellationDialogComponent
  implements OnInit, OnDestroy
{
  private subscription = new Subscription();

  iconTypes = ICON_TYPE;

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
    protected replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade,
    protected globalMessageService: GlobalMessageService,
    protected launchDialogService: LaunchDialogService,
    protected el: ElementRef
  ) {}

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

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
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

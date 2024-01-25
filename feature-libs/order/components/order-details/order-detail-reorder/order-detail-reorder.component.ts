/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { OrderDetailsService } from '../order-details.service';

@Component({
  selector: 'cx-order-details-reorder',
  templateUrl: './order-detail-reorder.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailReorderComponent implements OnInit, OnDestroy {
  constructor(
    protected orderDetailsService: OrderDetailsService,
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef
  ) {}

  @ViewChild('element') element: ElementRef;
  protected subscription = new Subscription();
  order$: Observable<any>;

  ngOnInit() {
    this.order$ = this.orderDetailsService.getOrderDetails();
  }

  onReorderClick(order: any) {
    this.launchDialog(order.code);
  }

  launchDialog(orderCode: string) {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.REORDER,
      this.element,
      this.vcr,
      { orderCode }
    );

    if (dialog) {
      this.subscription.add(dialog.pipe(take(1)).subscribe());
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

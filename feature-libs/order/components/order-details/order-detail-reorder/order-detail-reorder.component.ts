/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActiveCartService } from '@spartacus/cart/base/core';
import { CartModificationList, CartOutlets } from '@spartacus/cart/base/root';
import { UserIdService } from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { ReorderOrderFacade } from 'feature-libs/order/root/facade/reorder-order.facade';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { OrderDetailsService } from '../order-details.service';

@Component({
  selector: 'cx-order-details-reorder',
  templateUrl: './order-detail-reorder.component.html',
})
export class OrderDetailReorderComponent implements OnInit, OnDestroy {
  constructor(
    protected orderDetailsService: OrderDetailsService,
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef,
    protected userIdService: UserIdService,
    protected reorderOrderFacade: ReorderOrderFacade,
    protected activeCartService: ActiveCartService
  ) {}

  @ViewChild('element') element: ElementRef;
  protected subscription = new Subscription();
  order$: Observable<any>;
  userId: string;
  readonly CartOutlets = CartOutlets;

  ngOnInit() {
    this.order$ = this.orderDetailsService.getOrderDetails();
    this.subscription.add(
      this.userIdService.getUserId().subscribe((userId) => {
        this.userId = userId;
      })
    );
  }

  onReorderClick(order: any) {
    this.launchDialog();
    this.reorderOrderFacade
      .reorder(order.code, this.userId)
      .subscribe((cartModificationList: CartModificationList) => {
        this.activeCartService.reloadCurrentActiveCart();
        this.launchDialogService.emitData({
          loading: false,
          cartModificationList,
        });
      });
  }

  launchDialog() {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.REORDER,
      this.element,
      this.vcr,
      { loading: true }
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

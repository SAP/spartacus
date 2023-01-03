/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActiveCartService, MultiCartService } from '@spartacus/cart/base/core';
import { CartModificationList, CartOutlets } from '@spartacus/cart/base/root';
import { EventService, UserIdService } from '@spartacus/core';
import { ContextService, LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { ReorderOrderService } from 'feature-libs/order/core/facade/reorder-order.service';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { OrderDetailsService } from '../order-details.service';

@Component({
  selector: 'cx-order-details-reorder',
  templateUrl: './order-detail-reorder.component.html',
})
export class OrderDetailReorderComponent implements OnInit, OnDestroy {

  @ViewChild('element') element: ElementRef;
  protected subscription = new Subscription();

  constructor(protected orderDetailsService: OrderDetailsService, 
    protected launchDialogService: LaunchDialogService, 
    protected vcr: ViewContainerRef,
    protected contextService: ContextService,
    protected userIdService: UserIdService,
    protected reorderOrderService: ReorderOrderService,
    protected activeCartService: ActiveCartService,
    protected multiCartService: MultiCartService,
    protected eventService: EventService) {}

  order$: Observable<any>;
  userId: string;

  readonly CartOutlets = CartOutlets;

  ngOnInit() {
    this.order$ = this.orderDetailsService.getOrderDetails();
    this.orderDetailsService.getOrderDetails().subscribe((order) => {
        console.log(order);
    });
    this.userIdService.getUserId().subscribe((userId) => {
      this.userId = userId;
    });
  }

  onReorderClick(order: any) {
    this.launchDialog();  
    this.reorderOrderService.reorder(order.code, this.userId)
      .subscribe((cartModificationList: CartModificationList) => {
        console.log(cartModificationList);
        this.activeCartService.reloadCurrentActiveCart();
        this.launchDialogService.emitData({ loading: false, cartModificationList });
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

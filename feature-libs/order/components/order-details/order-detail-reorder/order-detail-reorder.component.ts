/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActiveCartService, MultiCartService } from '@spartacus/cart/base/core';
import { CartOutlets, OrderEntriesContext, ORDER_ENTRIES_CONTEXT } from '@spartacus/cart/base/root';
import { EventService, UserIdService } from '@spartacus/core';
import { ContextService, LaunchDialogService } from '@spartacus/storefront';
import { ReorderOrderService } from 'feature-libs/order/core/facade/reorder-order.service';
import { Observable } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';

@Component({
  selector: 'cx-order-details-reorder',
  templateUrl: './order-detail-reorder.component.html',
})
export class OrderDetailReorderComponent implements OnInit {

  @ViewChild('element') element: ElementRef;

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

  context$: Observable<OrderEntriesContext | undefined> =
    this.contextService.get<OrderEntriesContext>(ORDER_ENTRIES_CONTEXT);

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

    /* this.launchDialogService.openDialog(
        LAUNCH_CALLER.REORDER,
        this.element,
        this.vcr,
        { products, orderEntriesContext }
    ); */
    const orderId = order.code;

    
      this.reorderOrderService.reorder(orderId, this.userId)
      .subscribe((response) => {
        console.log(response);
        this.activeCartService.reloadCurrentActiveCart();
      }); 
  }
}

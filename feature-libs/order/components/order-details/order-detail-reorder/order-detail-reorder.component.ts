/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CartOutlets, OrderEntriesContext, ORDER_ENTRIES_CONTEXT } from '@spartacus/cart/base/root';
import { UserIdService } from '@spartacus/core';
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
    protected reorderOrderService: ReorderOrderService) {}

  order$: Observable<any>;

  context$: Observable<OrderEntriesContext | undefined> =
    this.contextService.get<OrderEntriesContext>(ORDER_ENTRIES_CONTEXT);

  readonly CartOutlets = CartOutlets;

  ngOnInit() {
    this.order$ = this.orderDetailsService.getOrderDetails();
    this.orderDetailsService.getOrderDetails().subscribe((order) => {
        console.log(order);
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

    this.userIdService.getUserId().subscribe((userId) => {
      this.reorderOrderService.reorder(orderId, userId)
      .subscribe((response) => {
        console.log(response);
      });
    });
    
    
  }
}

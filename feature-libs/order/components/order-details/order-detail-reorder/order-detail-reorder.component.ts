/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
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
    protected vcr: ViewContainerRef,) {}

  order$: Observable<any>;

  readonly CartOutlets = CartOutlets;

  ngOnInit() {
    this.order$ = this.orderDetailsService.getOrderDetails();
    this.orderDetailsService.getOrderDetails().subscribe((order) => {
        console.log(order);
    });
  }

  onReorderClick() {
    console.log("Clicked");
    this.launchDialogService.openDialog(
        LAUNCH_CALLER.REORDER,
        this.element,
        this.vcr
    );
  }
}

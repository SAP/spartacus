/*
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
import { MultiCartService } from '@spartacus/cart/base/core';
import { CartModificationList, CartOutlets } from '@spartacus/cart/base/root';
import { OCC_CART_ID_CURRENT } from '@spartacus/core';
import { ReorderOrderFacade } from '@spartacus/order/root';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
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
    protected reorderOrderFacade: ReorderOrderFacade,
    protected multiCartService: MultiCartService,
  ) {}

  @ViewChild('element') element: ElementRef;
  protected subscription = new Subscription();
  order$: Observable<any>;
  readonly CartOutlets = CartOutlets;

  ngOnInit() {
    this.order$ = this.orderDetailsService.getOrderDetails();
  }

  onReorderClick(order: any) {
    this.launchDialog();
    this.reorderOrderFacade
      .reorder(order.code)
      .subscribe((cartModificationList: CartModificationList) => {
        this.multiCartService.reloadCart(OCC_CART_ID_CURRENT);
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

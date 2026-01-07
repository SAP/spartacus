/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';
import { ProductCatalogService, TranslatePipe } from '@spartacus/core';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { OrderDetailsService } from '../order-details.service';

@Component({
  selector: 'cx-order-details-reorder',
  templateUrl: './order-detail-reorder.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe, TranslatePipe],
})
export class OrderDetailReorderComponent implements OnInit, OnDestroy {
  protected productCatalogService = inject(ProductCatalogService);

  constructor(
    protected orderDetailsService: OrderDetailsService,
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef
  ) {}

  @ViewChild('element') element: ElementRef;
  protected subscription = new Subscription();
  order$: Observable<any>;

  disabled$: Observable<boolean>;

  ngOnInit() {
    this.order$ = this.orderDetailsService.getOrderDetails();
    this.disabled$ = this.order$.pipe(
      map(
        (order) =>
          order &&
          !order.entries?.some((entry: OrderEntry) =>
            this.productCatalogService.isProductInCatalog(entry.product)
          )
      )
    );
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

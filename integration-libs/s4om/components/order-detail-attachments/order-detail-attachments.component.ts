/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { OrderDetailsService } from '@spartacus/order/components';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Order } from '@spartacus/order/root';

@Component({
  selector: 'cx-order-details-attachments',
  templateUrl: './order-detail-attachments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OrderDetailAttachmentsComponent implements OnInit {
  @ViewChild('element') element: ElementRef;
  protected destroyRef = inject(DestroyRef);
  order$: Observable<Order>;

  constructor(
    protected orderDetailsService: OrderDetailsService,
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef,
  ) {
  }

  ngOnInit(): void {
    this.initializeOrder();
  }

  initializeOrder(): void {
    this.order$ = this.orderDetailsService.getOrderDetails();
  }

  onOrderAttachmentsClick(orderCode: string): void {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.S4OM_ORDER_ATTACHMENTS,
      this.element,
      this.vcr,
      { orderCode },
    );

    if (dialog) {
      dialog.pipe(
        take(1),
        takeUntilDestroyed(this.destroyRef),
      ).subscribe();
    }
  }
}

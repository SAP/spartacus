/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { OrderDetailsService } from '../order-details.service';

@Component({
  selector: 'cx-order-attachments',
  templateUrl: './order-attachments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe, TranslatePipe],
})
export class OrderAttachmentsComponent {
  protected orderDetailsService = inject(OrderDetailsService);
  protected launchDialogService = inject(LaunchDialogService);
  protected vcr = inject(ViewContainerRef);
  protected destroyRef = inject(DestroyRef);

  @ViewChild('element') element: ElementRef;
  order$: Observable<Order> = this.orderDetailsService.getOrderDetails();

  onOrderAttachmentsClick(orderCode: string): void {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.ORDER_ATTACHMENTS,
      this.element,
      this.vcr,
      { orderCode }
    );

    if (dialog) {
      dialog.pipe(take(1), takeUntilDestroyed(this.destroyRef)).subscribe();
    }
  }
}

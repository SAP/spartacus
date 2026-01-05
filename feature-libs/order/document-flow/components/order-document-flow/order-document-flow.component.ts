/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { Order } from '@spartacus/order/root';
import { QueryService, UserIdService } from '@spartacus/core';
import { OrderDetailsService } from '@spartacus/order/components';

@Component({
  selector: 'cx-order-document-flow',
  templateUrl: './order-document-flow.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OrderDocumentFlowComponent {
  protected orderDetailsService = inject(OrderDetailsService);
  protected launchDialogService = inject(LaunchDialogService);
  protected vcr = inject(ViewContainerRef);
  protected destroyRef = inject(DestroyRef);
  protected queryService: QueryService = inject(QueryService);
  protected userIdService: UserIdService = inject(UserIdService);

  @ViewChild('element') element: ElementRef;
  order$: Observable<Order> = this.orderDetailsService.getOrderDetails();

  onOrderDocumentFlowClick(orderCode: string): void {
    this.launchDialogService.openDialogAndSubscribe(
      LAUNCH_CALLER.ORDER_DOCUMENT_FLOW,
      this.element,
      { orderCode }
    );
  }
}

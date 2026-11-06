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
import { QueryService, TranslatePipe, UserIdService } from '@spartacus/core';
import { OrderDetailsService } from '@spartacus/order/components';
import { Order } from '@spartacus/order/root';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-order-document-flow',
  templateUrl: './order-document-flow.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe, TranslatePipe],
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

/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';

@Component({
  selector: 'cx-order-details-actions',
  templateUrl: './order-detail-actions.component.html',
  standalone: false,
})
export class OrderDetailActionsComponent {
  protected orderDetailsService = inject(OrderDetailsService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  order$: Observable<any> = this.orderDetailsService.getOrderDetails();
}

/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BtnLikeLinkDirective } from '@spartacus/storefront';
import { TranslatePipe } from '@spartacus/core';
import { UrlPipe } from '@spartacus/core';

@Component({
  selector: 'cx-order-details-actions',
  templateUrl: './order-detail-actions.component.html',
  imports: [
    NgIf,
    RouterLink,
    BtnLikeLinkDirective,
    AsyncPipe,
    TranslatePipe,
    UrlPipe,
  ],
})
export class OrderDetailActionsComponent {
  constructor(protected orderDetailsService: OrderDetailsService) {}

  order$: Observable<any> = this.orderDetailsService.getOrderDetails();
}

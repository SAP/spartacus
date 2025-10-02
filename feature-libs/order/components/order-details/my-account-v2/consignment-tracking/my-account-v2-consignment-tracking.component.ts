/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, HostBinding, inject, OnInit } from '@angular/core';
import { Consignment, Order } from '@spartacus/order/root';
import { OutletContextData } from '@spartacus/storefront';
import { ConsignmentTrackingComponent } from '../../order-detail-items';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '@spartacus/core';
import { CxDatePipe } from '@spartacus/core';
import { MockDatePipe } from '@spartacus/core';
type ConsignmentOutletContextData = { item: Consignment; order?: Order };
@Component({
  selector: 'cx-my-account-v2-consignment-tracking',
  templateUrl: './my-account-v2-consignment-tracking.component.html',
  imports: [NgIf, TranslatePipe, CxDatePipe, TranslatePipe, MockDatePipe],
})
export class MyAccountV2ConsignmentTrackingComponent
  extends ConsignmentTrackingComponent
  implements OnInit
{
  @HostBinding('className') componentClass: string = 'cx-list-header col-12';
  protected outlet = inject(OutletContextData);

  ngOnInit(): void {
    this.outlet?.context$.subscribe((context: ConsignmentOutletContextData) => {
      this.consignment = context.item;
    });
    this.outlet?.context$.subscribe((context: ConsignmentOutletContextData) => {
      this.orderCode = context?.order?.code ?? '';
    });
    super.ngOnInit();
  }
}

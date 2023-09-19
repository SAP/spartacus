/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Consignment, ConsignmentTracking } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { OrderHistoryEnhancedUIAdapter } from '../order-history-enhanced-ui.adapter';

@Component({
  selector: 'cx-consignment-tracking-enhanced-ui',
  templateUrl: './consignment-tracking-enhanced-ui.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsignmentTrackingEnhancedUIComponent
  implements OnInit, OnDestroy
{
  @Input()
  consignment: Consignment;
  @Input()
  orderCode: string;
  consignmentTracking$: Observable<ConsignmentTracking>;

  constructor(protected adapter: OrderHistoryEnhancedUIAdapter) {}

  ngOnInit() {
    if (this.orderCode && this.consignment) {
      if (this.consignment.trackingID) {
        this.consignmentTracking$ = this.adapter.getConsignmentTracking(
          this.orderCode,
          this.consignment.code ?? ''
        );
      }
    }
  }
  ngOnDestroy(): void {}
}

/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef, inject } from '@angular/core';
import {
  Consignment,
  ConsignmentTracking,
  OrderHistoryFacade,
} from '@spartacus/order/root';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'cx-consignment-tracking',
  templateUrl: './consignment-tracking.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ConsignmentTrackingComponent implements OnInit, OnDestroy {
  protected orderHistoryFacade = inject(OrderHistoryFacade);
  protected launchDialogService = inject(LaunchDialogService);
  protected vcr = inject(ViewContainerRef);

  consignmentStatus: string[] = [
    'SHIPPED',
    'IN_TRANSIT',
    'DELIVERY_COMPLETED',
    'DELIVERY_REJECTED',
    'DELIVERING',
  ];
  @ViewChild('element') element: ElementRef;

  @Input()
  consignment: Consignment;
  @Input()
  orderCode: string;
  consignmentTracking$: Observable<ConsignmentTracking>;

  ngOnInit() {
    this.consignmentTracking$ =
      this.orderHistoryFacade.getConsignmentTracking();
  }

  openTrackingDialog(consignment: Consignment) {
    if (consignment.code) {
      this.orderHistoryFacade.loadConsignmentTracking(
        this.orderCode,
        consignment.code
      );
    }
    const modalInstanceData = {
      tracking$: this.consignmentTracking$,
      shipDate: consignment.statusDate,
    };

    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.CONSIGNMENT_TRACKING,
      this.element,
      this.vcr,
      modalInstanceData
    );

    if (dialog) {
      dialog.pipe(take(1)).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.orderHistoryFacade.clearConsignmentTracking();
  }
}

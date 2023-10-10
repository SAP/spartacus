/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, HostBinding, inject, OnInit } from '@angular/core';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
  OutletContextData,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Consignment } from '@spartacus/order/root';
import { OrderConsignmentsService } from '../../order-consignments.service';

@Component({
  selector: 'cx-consignment-tracking-link',
  templateUrl: './consignment-tracking-link.component.html',
  // host: { class: 'cx-list-header col-12' },
})
export class ConsignmentTrackingLinkComponent implements OnInit {
  @HostBinding('className') componentClass: string;
  consignment$: Observable<Consignment>;
  protected orderConsignmentsService = inject(OrderConsignmentsService);
  protected launchDialogService = inject(LaunchDialogService);
  protected outlet = inject(OutletContextData);

  ngOnInit(): void {
    this.componentClass = 'cx-list-header col-12';
    this.consignment$ = this.outlet?.context$.pipe(
      map((context) => context.item)
    );
  }
  openTrackingDialog(consignment: Consignment) {
    let tracking = {};
    if (consignment.consignmentTracking) {
      tracking = consignment.consignmentTracking;
    }
    const modalInstanceData = {
      tracking$: of(tracking),
      shipDate: consignment.statusDate,
    };

    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.CONSIGNMENT_TRACKING,
      undefined,
      undefined,
      modalInstanceData
    );

    if (dialog) {
      dialog.pipe(take(1)).subscribe();
    }
  }
  isStatusValid(status: string): boolean {
    return this.orderConsignmentsService.isStatusValid(status);
  }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
  OutletContextData,
} from '@spartacus/storefront';
import { of, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Consignment } from '@spartacus/order/root';
import { OrderConsignmentsService } from '../../order-consignments.service';

@Component({
  selector: 'cx-consignment-tracking-link',
  templateUrl: './consignment-tracking-link.component.html',
  host: { class: 'cx-list-header col-12' },
})
export class ConsignmentTrackingLinkComponent implements OnInit, OnDestroy {
  consignment: Consignment;
  protected subscription = new Subscription();
  protected orderConsignmentsService = inject(OrderConsignmentsService);
  protected launchDialogService = inject(LaunchDialogService);
  protected vcr = inject(ViewContainerRef);
  protected cd = inject(ChangeDetectorRef);
  protected outlet = inject(OutletContextData);

  @ViewChild('element') element: ElementRef;
  consignmentStatus: string[] = this.orderConsignmentsService.consignmentStatus;
  ngOnInit(): void {
    this.subscription.add(
      this.outlet?.context$.subscribe((context: { item?: Consignment }) => {
        if (context.item !== undefined) {
          this.consignment = context.item;
        }
        this.cd.markForCheck();
      })
    );
  }
  openTrackingDialog() {
    let tracking = {};
    if (this.consignment.consignmentTracking) {
      tracking = this.consignment.consignmentTracking;
    }
    const modalInstanceData = {
      tracking$: of(tracking),
      shipDate: this.consignment.statusDate,
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
    this.subscription?.unsubscribe();
  }
}

/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input, OnInit, inject } from '@angular/core';
import { PointOfService } from '@spartacus/core';
import { Consignment } from '@spartacus/order/root';
import { OutletContextData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export type IOutletContextData = { item: Consignment };

/**
 * A container component of the pickup address for order consignment.
 */
@Component({
  selector: 'cx-pickup-in-store-order-consignment',
  templateUrl: './pickup-in-store-order-consignment-container.component.html',
  standalone: false,
})
export class PickupInStoreOrderConsignmentContainerComponent implements OnInit {
  protected outlet = inject<OutletContextData<IOutletContextData>>(OutletContextData, { optional: true });


  @Input() pointOfService$: Observable<PointOfService> | undefined;

  ngOnInit(): void {
    this.pointOfService$ = this.outlet?.context$?.pipe(
      map((context) => context.item?.deliveryPointOfService),
      filter(
        (pointOfService): pointOfService is PointOfService => !!pointOfService
      )
    );
  }
}

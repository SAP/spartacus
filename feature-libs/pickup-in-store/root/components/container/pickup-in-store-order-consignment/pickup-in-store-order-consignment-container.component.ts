/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit, Optional } from '@angular/core';
import { PointOfService } from '@spartacus/core';
import { Consignment, Order } from '@spartacus/order/root';
import { OutletContextData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export type IOutletContextData = { item: Consignment; order: Order };

/**
 * A container component of the pair of the pickup options radio buttons for cart entry.
 */
@Component({
  selector: 'cx-pickup-in-store-order-consignment',
  templateUrl: './pickup-in-store-order-consignment-container.component.html',
})
export class PickupInStoreOrderConsignmentContainerComponent implements OnInit {
  constructor(
    @Optional() protected outlet: OutletContextData<IOutletContextData>
  ) {}

  pointOfService$: Observable<PointOfService>;

  ngOnInit(): void {
    this.pointOfService$ = this.outlet?.context$?.pipe(
      map((context) => context.item?.deliveryPointOfService),
      filter(
        (pointOfService): pointOfService is PointOfService => !!pointOfService
      )
    );
  }
}

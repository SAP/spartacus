/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { Consignment, Order } from '@spartacus/order/root';
import { OutletContextData } from '@spartacus/storefront';
import { tap } from 'rxjs/operators';
/**
 * A container component of the pair of the pickup options radio buttons for cart entry.
 */
@Component({
  selector: 'cx-pickup-in-store-order-consignment',
  templateUrl: './pickup-in-store-order-consignment-container.component.html',
})
export class PickupInStoreOrderConsignmentContainerComponent implements OnInit {
  constructor(
    protected outlet: OutletContextData<{ item: Consignment; order: Order }>
  ) {}
  consignment: Consignment;
  order: Order;
  ngOnInit(): void {
    this.outlet?.context$
      ?.pipe(
        tap((context) => {
          this.consignment = context.item;
          this.order = context.order;
        })
      )
      .subscribe();
  }
  normalizeFormattedAddress(formattedAddress: string): string {
    const addresses = formattedAddress
      .split(',')
      .map((address) => address.trim());

    return addresses.filter(Boolean).join(', ');
  }
}

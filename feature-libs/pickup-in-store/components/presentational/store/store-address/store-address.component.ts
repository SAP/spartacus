/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';
import { PointOfService } from '@spartacus/core';

/**
 * The address of a point of service.
 */
@Component({
  selector: 'cx-store-address',
  templateUrl: 'store-address.component.html',
  imports: [],
})
export class StoreAddressComponent {
  /** The details of the store */
  // TODO: Skipped for migration because:
  //  This input is used in a control flow expression (e.g. `@if` or `*ngIf`)
  //  and migrating would break narrowing currently.
  @Input() storeDetails: PointOfService = {};
}

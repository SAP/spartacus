/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';
import { PointOfService } from '@spartacus/core';

@Component({
  selector: 'cx-store-address',
  templateUrl: 'store-address.component.html',
})
export class StoreAddressComponent {
  @Input()
  storeDetails: PointOfService = {};
}

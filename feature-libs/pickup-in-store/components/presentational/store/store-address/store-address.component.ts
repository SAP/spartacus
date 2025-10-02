/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';
import { PointOfService } from '@spartacus/core';
import { NgIf } from '@angular/common';

/**
 * The address of a point of service.
 */
@Component({
  selector: 'cx-store-address',
  templateUrl: 'store-address.component.html',
  imports: [NgIf],
})
export class StoreAddressComponent {
  /** The details of the store */
  @Input() storeDetails: PointOfService = {};
}

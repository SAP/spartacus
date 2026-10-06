/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgIf } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { PointOfService } from '@spartacus/core';

/**
 * The address of a point of service.
 */
@Component({
  selector: 'cx-store-address',
  templateUrl: 'store-address.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NgIf],
})
export class StoreAddressComponent {
  /** The details of the store */
  @Input() storeDetails: PointOfService = {};
}

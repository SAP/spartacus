/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';
import { PointOfService } from '@spartacus/core';

@Component({
  selector: 'cx-pickup-info',
  templateUrl: './pickup-info.component.html',
  standalone: false,
})
export class PickupInfoComponent {
  @Input() storeDetails: PointOfService;
}

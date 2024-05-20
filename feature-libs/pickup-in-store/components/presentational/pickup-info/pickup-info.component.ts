/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';
import { PointOfService } from '@spartacus/core';

@Component({
  selector: 'cx-pickup-info',
  templateUrl: './pickup-info.component.html',
})
export class PickupInfoComponent {
  @Input() storeDetails: PointOfService;
}

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';
import { PointOfService } from '@spartacus/core';

@Component({
  selector: 'cx-pickup-delivery-info',
  templateUrl: './pickup-delivery-info.component.html',
})
export class PickupDeliveryInfoComponent {
  @Input() storeDetails: PointOfService;
}

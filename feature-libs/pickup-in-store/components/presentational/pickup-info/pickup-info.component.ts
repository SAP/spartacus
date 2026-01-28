/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';
import { PointOfService, TranslatePipe } from '@spartacus/core';
import { StoreAddressComponent } from '../store/store-address/store-address.component';
import { StoreScheduleComponent } from '../store/store-schedule/store-schedule.component';

@Component({
  selector: 'cx-pickup-info',
  templateUrl: './pickup-info.component.html',
  imports: [StoreAddressComponent, StoreScheduleComponent, TranslatePipe],
})
export class PickupInfoComponent {
  @Input() storeDetails: PointOfService;
}

/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';
import { PointOfService } from '@spartacus/core';
import { StoreAddressComponent } from '../store/store-address/store-address.component';
import { StoreScheduleComponent } from '../store/store-schedule/store-schedule.component';
import { TranslatePipe } from '../../../../../projects/core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../../projects/core/src/i18n/testing/mock-translate.pipe';

@Component({
    selector: 'cx-pickup-info',
    templateUrl: './pickup-info.component.html',
    imports: [
        StoreAddressComponent,
        StoreScheduleComponent,
        TranslatePipe,
        MockTranslatePipe,
    ],
})
export class PickupInfoComponent {
  @Input() storeDetails: PointOfService;
}

/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PageLayoutModule, OutletRefModule } from '@spartacus/storefront';

@Component({
    selector: 'cx-test-outlet-slot',
    templateUrl: './test-outlet-slot.component.html',
    standalone: true,
    imports: [
        PageLayoutModule,
        OutletRefModule,
        AsyncPipe,
    ],
})
export class TestOutletSlotComponent {
  testSlot1 = 'Section2A';
  testSlot2 = 'Section2B';
}

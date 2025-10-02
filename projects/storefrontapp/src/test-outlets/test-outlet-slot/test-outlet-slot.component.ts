/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { PageLayoutComponent } from '@spartacus/storefront';
import { OutletRefDirective } from '@spartacus/storefront';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'cx-test-outlet-slot',
  templateUrl: './test-outlet-slot.component.html',
  imports: [PageLayoutComponent, OutletRefDirective, AsyncPipe],
})
export class TestOutletSlotComponent {
  testSlot1 = 'Section2A';
  testSlot2 = 'Section2B';
}

/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { OutletRefDirective, PageLayoutComponent } from '@spartacus/storefront';

@Component({
  selector: 'cx-test-outlet-component',
  templateUrl: './test-outlet-component.component.html',
  imports: [PageLayoutComponent, OutletRefDirective],
})
export class TestOutletComponentComponent {
  testComponent = 'CMSParagraphComponent';
}

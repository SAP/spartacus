/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { PageLayoutModule, OutletRefModule } from '@spartacus/storefront';

@Component({
    selector: 'cx-test-outlet-component',
    templateUrl: './test-outlet-component.component.html',
    standalone: true,
    imports: [PageLayoutModule, OutletRefModule],
})
export class TestOutletComponentComponent {
  testComponent = 'CMSParagraphComponent';
}

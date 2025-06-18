/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';

@Component({
  selector: 'cx-test-outlet-component',
  templateUrl: './test-outlet-component.component.html',
  standalone: false,
})
export class TestOutletComponentComponent {
  testComponent = 'CMSParagraphComponent';
}

/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { PageLayoutComponent } from '@spartacus/storefront';
import { OutletRefDirective } from '@spartacus/storefront';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'cx-test-outlet-template',
  templateUrl: './test-outlet-template.component.html',
  imports: [PageLayoutComponent, OutletRefDirective, AsyncPipe, JsonPipe],
})
export class TestOutletTemplateComponent {
  testTemplate = 'ContentPage1Template';
}

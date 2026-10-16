/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { OutletRefDirective, PageLayoutComponent } from '@spartacus/storefront';

@Component({
  selector: 'cx-test-outlet-template',
  templateUrl: './test-outlet-template.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [PageLayoutComponent, OutletRefDirective, AsyncPipe, JsonPipe],
})
export class TestOutletTemplateComponent {
  testTemplate = 'ContentPage1Template';
}

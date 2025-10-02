/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { PageLayoutComponent } from '../../../../storefrontlib/cms-structure/page/page-layout/page-layout.component';
import { OutletRefDirective } from '../../../../storefrontlib/cms-structure/outlet/outlet-ref/outlet-ref.directive';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'cx-test-outlet-template',
  templateUrl: './test-outlet-template.component.html',
  imports: [PageLayoutComponent, OutletRefDirective, AsyncPipe, JsonPipe],
})
export class TestOutletTemplateComponent {
  testTemplate = 'ContentPage1Template';
}

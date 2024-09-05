/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { PageLayoutModule, OutletRefModule } from '@spartacus/storefront';

@Component({
    selector: 'cx-test-outlet-template',
    templateUrl: './test-outlet-template.component.html',
    standalone: true,
    imports: [
        PageLayoutModule,
        OutletRefModule,
        AsyncPipe,
        JsonPipe,
    ],
})
export class TestOutletTemplateComponent {
  testTemplate = 'ContentPage1Template';
}

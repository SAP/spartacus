/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { I18nModule } from '@spartacus/core';

// TODO: Improve a11y with better text appropriate to usage (example: loading cart spinner)

@Component({
    selector: 'cx-spinner',
    templateUrl: './spinner.component.html',
    standalone: true,
    imports: [I18nModule],
})
export class SpinnerComponent {
  constructor() {
    // Intentional empty constructor
  }
}

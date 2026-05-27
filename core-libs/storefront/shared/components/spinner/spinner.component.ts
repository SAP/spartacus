/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { TranslatePipe } from '@spartacus/core';

// TODO: Improve a11y with better text appropriate to usage (example: loading cart spinner)

@Component({
  selector: 'cx-spinner',
  templateUrl: './spinner.component.html',
  imports: [TranslatePipe],
})
export class SpinnerComponent {
  constructor() {
    // Intentional empty constructor
  }
}

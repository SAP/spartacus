/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { TranslatePipe } from '../../../../core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../core/src/i18n/testing/mock-translate.pipe';

// TODO: Improve a11y with better text appropriate to usage (example: loading cart spinner)

@Component({
  selector: 'cx-spinner',
  templateUrl: './spinner.component.html',
  imports: [TranslatePipe, MockTranslatePipe],
})
export class SpinnerComponent {
  constructor() {
    // Intentional empty constructor
  }
}

/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgClass } from '@angular/common';
import { Component, Input, output } from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
@Component({
  selector: 'cx-progress-button',
  templateUrl: './progress-button.component.html',
  imports: [NgClass, TranslatePipe],
})
export class ProgressButtonComponent {
  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  ariaLabel: string = '';

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  class: string = '';

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  disabled: boolean = false;

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  loading: boolean = false;

  readonly clickEvent = output<void>();

  constructor() {
    // Intentional empty constructor
  }
}

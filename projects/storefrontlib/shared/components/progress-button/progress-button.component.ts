/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
@Component({
  selector: 'cx-progress-button',
  templateUrl: './progress-button.component.html',
  imports: [NgClass, NgIf, TranslatePipe],
})
export class ProgressButtonComponent {
  @Input()
  ariaLabel: string = '';

  @Input()
  class: string = '';

  @Input()
  disabled: boolean = false;

  @Input()
  loading: boolean = false;

  @Output()
  clickEvent = new EventEmitter<void>();

  constructor() {
    // Intentional empty constructor
  }
}

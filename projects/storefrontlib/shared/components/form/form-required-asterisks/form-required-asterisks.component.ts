/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Renders translated form required asteriks component.
 */
@Component({
  selector: 'cx-form-required-asterisks',
  templateUrl: './form-required-asterisks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class FormRequiredAsterisksComponent {
  /**
   * Component Title translation (defaulted to common.required)
   */
  @Input() titleTranslation?: string;
}

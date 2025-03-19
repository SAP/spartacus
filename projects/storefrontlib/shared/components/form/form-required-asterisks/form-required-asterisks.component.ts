/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FeaturesConfigModule, I18nModule } from '@spartacus/core';

/**
 * Renders translated form required asteriks component.
 */
@Component({
  selector: 'cx-form-required-asterisks',
  templateUrl: './form-required-asterisks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FeaturesConfigModule, I18nModule],
})
export class FormRequiredAsterisksComponent {
  /**
   * Component Title translation (defaulted to common.required)
   */
  @Input() titleTranslation?: string = 'common.required';
}

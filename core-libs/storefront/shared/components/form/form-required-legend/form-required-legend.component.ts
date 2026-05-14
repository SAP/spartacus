/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { I18nModule } from '@spartacus/core';

/**
 * Renders translated form required asteriks component.
 */
@Component({
  selector: 'cx-form-required-legend',
  templateUrl: './form-required-legend.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, I18nModule],
})
export class FormRequiredLegendComponent {
  /**
   * Form Legend translation (defaulted to 'formLegend.required')
   */
  @Input() formLegendTranslation?: string = 'formLegend.required';
}

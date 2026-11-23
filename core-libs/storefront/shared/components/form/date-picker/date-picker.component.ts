/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input, inject, output, input } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
} from '@angular/forms';
import { CxDatePipe, TranslatePipe } from '@spartacus/core';
import { FormErrorsComponent } from '../form-errors/form-errors.component';
import { DatePickerService } from './date-picker.service';

/**
 * Component that adds a date control. While the native date picker works in most
 * modern browsers, some browsers need more guidance (placeholder), validation and
 * date conversion.
 *
 * The data picker supports (optional) min and max form controls, so that you can
 * limit the start and/or end date.
 *
 * Most of the implementation is done in the `DatePickerFallbackDirective`.
 */
@Component({
  selector: 'cx-date-picker',
  templateUrl: './date-picker.component.html',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormErrorsComponent,
    TranslatePipe,
    CxDatePipe,
  ],
})
export class DatePickerComponent {
  protected service = inject(DatePickerService);

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input() control: UntypedFormControl;
  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input() min?: string;
  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input() max?: string;
  readonly required = input<boolean>();
  readonly label = input<string | undefined>('Date');

  readonly update = output<void>();

  change() {
    this.update.emit();
  }

  get placeholder() {
    return this.service.placeholder;
  }

  get pattern() {
    return this.service.pattern;
  }

  /**
   * Only returns the date if we have a valid format. We do this to avoid
   * loads of console errors coming from the datePipe while the user is typing
   * (in those browsers where the date picker isn't supported).
   */

  getDate(date?: string): string | undefined {
    return date && this.service.isValidFormat(date) ? date : undefined;
  }
}

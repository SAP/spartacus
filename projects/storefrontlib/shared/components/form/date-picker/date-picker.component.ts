import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  // we cannot use onPush change detection as the form state isn't updated without explicit
  // change detection, see https://github.com/angular/angular/issues/10816
})
export class DatePickerComponent {
  constructor(protected service: DatePickerService) {}
  @Input() control: FormControl;
  @Input() min?: string;
  @Input() max?: string;

  @Output() update: EventEmitter<void> = new EventEmitter();

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

  getDate(date: string): string {
    return this.service.isValidFormat(date) ? date : null;
  }
}

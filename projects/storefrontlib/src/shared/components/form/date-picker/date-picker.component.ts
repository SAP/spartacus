import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

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
  @Input() control: FormControl;
  @Input() min: FormControl;
  @Input() max: FormControl;

  update() {
    // we're updating the min/max controls to ensure that validation kicks in
    this.min?.updateValueAndValidity();
    this.max?.updateValueAndValidity();
  }
}

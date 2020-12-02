import { Directive, ElementRef, forwardRef, HostBinding } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { DatePickerService } from './date-picker.service';

/**
 * Directive that adds an alternative for the native html5 date picker
 * for those browsers that won't support it, Safari being our main concern.
 *
 * An input with `type="date"` will be ignored by browsers that do not support
 * the native date picker. The default text type will be used instead. This directive
 * introduces a few features to ensure that valid dates are added:
 *
 * - add a placeholder to the text input so that the user understands the date format he should provide
 * - add a pattern validator to the input, based on the the placeholder. Please note that the
 *   standard pattern will no longer be applicable since the pattern is added dynamically.
 * - support the `min` and `max` properties by validating the input against those values.
 *
 * The placeholder is provided by the `DatePickerService.placeholder` to allow for customizations.
 *
 */
@Directive({
  selector: '[cxDatePickerFallback]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DatePickerFallbackDirective),
      multi: true,
    },
  ],
})
export class DatePickerFallbackDirective implements Validator {
  @HostBinding('placeholder') placeholder = this.service.placeholder;
  @HostBinding('pattern') pattern = this.service.pattern;

  constructor(
    protected elementRef: ElementRef<HTMLInputElement>,
    protected service: DatePickerService
  ) {}

  validate(formControl: AbstractControl): ValidationErrors {
    const errors: ValidationErrors = {};

    if (formControl.value && formControl.value !== '') {
      // we need to do the pattern validation here, as the default
      // pattern validator doesn't work dynamically
      if (!this.service.isValidFormat(formControl.value, this.pattern)) {
        errors.pattern = true;
      }

      if (!errors.pattern) {
        if (this.validateMin(formControl)) {
          errors.min = true;
        }
        if (this.validateMax(formControl)) {
          errors.max = true;
        }
      }
    }

    return Object.keys(errors).length === 0 ? null : errors;
  }

  protected validateMin(formControl: AbstractControl): boolean {
    const date = this.service.getDate(formControl.value);
    return date && date < this.min;
  }

  protected validateMax(formControl: AbstractControl): boolean {
    const date = this.service.getDate(formControl.value);
    return date && date > this.max;
  }

  protected get min(): Date {
    return this.service.getDate(this.host.getAttribute('min'));
  }

  protected get max(): Date {
    return this.service.getDate(this.host.getAttribute('max'));
  }

  protected get host(): HTMLInputElement {
    return this.elementRef.nativeElement;
  }
}

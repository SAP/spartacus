import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
} from '@angular/forms';
import { DateTimePickerFormatterService } from './date-time-picker-formatter.service';

/**
 * This component serves the browser's native `<input type="datetime-local">` HTML element
 * in whilst projecting the value in the standard date format with regards to timezone offsets.
 */
@Component({
  selector: 'cx-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimePickerComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DateTimePickerComponent),
      multi: true,
    },
  ],
})
export class DateTimePickerComponent
  implements ControlValueAccessor, Validator {
  value: string;
  nativeValue: string = null;

  /**
   * Reference to input element of type 'datetime-local'.
   */
  @ViewChild('inputElement', { static: false, read: ElementRef })
  input: ElementRef;

  /**
   * Minimum value allowed for input element.
   */
  @Input()
  min?: string;

  /**
   * Maximum value allowed for input element.
   */
  @Input()
  max?: string;

  /**
   * Whether to use `required` validator.
   */
  @Input()
  required?: boolean;

  /**
   * Condition to display as invalid.
   */
  @Input()
  invalid?: boolean;

  constructor(protected dateFormatterService: DateTimePickerFormatterService) {}

  /**
   * Handler method for input interactions.
   * @param event: Input event.
   */
  onInput(event) {
    this.value = this.dateFormatterService.toModel(event.target.value);
    this.nativeValue = event.target.value;
    this.onChange(this.value);
  }

  /**
   * Handler method for when the value is modified.
   * @param event: Change event.
   */
  onChange(_event: any) {}

  /**
   * Handler method for when the element is interacted with.
   */
  onTouched() {}

  /**
   * Register the `onChange()` handler method.
   */
  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  /**
   * Register the `onTouched()` handler method.
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Set the value of the input element.
   * @param value: Date-like string to be set
   */
  writeValue(value: string): void {
    if (value) {
      this.value = value;
      this.nativeValue = this.dateFormatterService.toNative(value);
    }
  }

  /**
   * Get the minimum value allowed for the input.
   */
  getMin(): string {
    return this.dateFormatterService.toNative(this.min);
  }

  /**
   * Get the maximum value allowed for the input.
   */
  getMax(): string {
    return this.dateFormatterService.toNative(this.max);
  }

  /**
   * Returns failing validators if input value is invalid
   */
  validate(): { [key: string]: any } {
    if (this.input && !this.input.nativeElement.validity.valid) {
      const validity = this.input.nativeElement.validity;
      const validators: { [key: string]: boolean } = {};
      if (validity.rangeOverflow) {
        validators.cxDateMax = true;
      }
      if (validity.rangeUnderflow) {
        validators.cxDateMin = true;
      }
      return validators;
    }
  }
}

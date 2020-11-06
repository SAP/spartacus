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
import {
  DateTimePickerFormatterService,
  DATETIME_PICKER_INPUT_TYPE,
} from '@spartacus/core';

/**
 * This component serves the browser's date-like input HTML element
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
   * Reference to input element.
   */
  @ViewChild('inputElement', { static: false, read: ElementRef })
  input: ElementRef;

  /**
   * Type attribute on input element to manipulate datetime-like value.
   * Defaults to 'datetime-local'.
   */
  @Input()
  inputType?: DATETIME_PICKER_INPUT_TYPE =
    DATETIME_PICKER_INPUT_TYPE.DATETIME_LOCAL;

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
    this.value = this.dateFormatterService.toModel(
      event.target.value,
      this.inputType
    );
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
      this.nativeValue = this.dateFormatterService.toNative(
        value,
        this.inputType
      );
    }
  }

  /**
   * Get the minimum value allowed for the input.
   */
  getMin(): string {
    return this.dateFormatterService.toNative(this.min, this.inputType);
  }

  /**
   * Get the maximum value allowed for the input.
   */
  getMax(): string {
    return this.dateFormatterService.toNative(this.max, this.inputType);
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

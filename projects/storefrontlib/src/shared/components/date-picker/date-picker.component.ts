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
import { DatePickerFormatterService } from './date-picker-formatter.service';

@Component({
  selector: 'cx-date-picker',
  templateUrl: './date-picker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent implements ControlValueAccessor, Validator {
  value: string;
  nativeValue: string = null;

  @ViewChild('inputElement', { static: false, read: ElementRef })
  input: ElementRef;

  @Input()
  min?: string;

  @Input()
  max?: string;

  @Input()
  endOfDay = false;

  @Input()
  required?: boolean;

  @Input()
  invalid?: boolean;

  constructor(protected dateFormatterService: DatePickerFormatterService) {}

  onInput(event) {
    this.value = this.dateFormatterService.toModel(
      event.target.value,
      this.endOfDay
    );
    this.nativeValue = event.target.value;
    this.onChange(this.value);
  }

  onChange(_event: any) {}

  onTouched() {}

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(value: string): void {
    if (value) {
      this.value = value;
      this.nativeValue = this.dateFormatterService.toNative(value);
    }
  }

  getMin(): string {
    return this.dateFormatterService.toNative(this.min);
  }

  getMax(): string {
    return this.dateFormatterService.toNative(this.max);
  }

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

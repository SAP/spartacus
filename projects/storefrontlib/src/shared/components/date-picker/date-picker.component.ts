import { Component, Input } from '@angular/core';

import { forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateFormatterService } from './date-formatter.service';

export const DATE_PICKER_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePickerComponent),
  multi: true,
};

@Component({
  selector: 'cx-date-picker',
  templateUrl: './date-picker.component.html',
  providers: [DATE_PICKER_ACCESSOR],
})
export class DatePickerComponent implements ControlValueAccessor {
  value: string;
  valueAsDate: Date;

  @Input()
  eod = false;

  @Input()
  placeholder: string;

  constructor(protected dateFormatterService: DateFormatterService) {}

  onInput(event) {
    this.value = this.dateFormatterService.transform(event.target.value, this.eod);
    this.valueAsDate = this.dateFormatterService.toDate(event.target.value);
    this.onChange(this.value)
  }

  onChange(_event: any) {}

  onTouched() {}

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value;
      this.valueAsDate = this.dateFormatterService.toDate(value);
    }
  }
}

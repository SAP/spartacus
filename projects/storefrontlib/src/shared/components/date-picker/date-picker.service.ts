import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DatePickerService {
  /**
   * Returns an input placeholder that is used as a fallback for browsers that don't
   * support the native date control.
   *
   * The placeholder is aligned with the date picker validation as well. If you change this
   * placeholder and validator, you must realize the consequences for the (lack of) date
   * conversion.
   */
  placeholder = 'yyyy/mm/dd';
}

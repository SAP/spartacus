import { Injectable } from '@angular/core';

/**
 * Service that provides the placeholder and input pattern for date pickers. This is
 * used in Spartacus to support browser that won't support the native html5 date picker
 * using `<input type="date">`.
 *
 * While the placeholder is configurable, you should be aware that the placeholder format
 * defaults to `yyyy-mm-dd` to align with Safaris limited support of ISO 8601.
 * Another consideration is the support of date formats in the backend. In case you change
 * this format, you might need to serialize the date to the supported date format in the
 * backend.
 *
 */
@Injectable({
  providedIn: 'root',
})
export class DatePickerService {
  get placeholder(): string {
    return 'yyyy-mm-dd';
  }

  /**
   * The default date pattern is based on the placeholder string;
   */
  get pattern(): string {
    return this.placeholder
      .replace('yyyy', '\\d{4}')
      .replace('mm', '\\d{1,2}')
      .replace('dd', '\\d{1,2}');
  }

  /**
   * Validates if the string based date value is a valid date.
   */
  isValidFormat(date: string, pattern?: string): boolean {
    const patternRegex = new RegExp(`^${pattern ?? this.pattern}$`);
    return patternRegex.test(date);
  }

  /**
   * Since Safari doesn't support proper date formats (ISO 8601), we need to do this
   * ourselves. We cannot rely on `new Date('2020-1-1')`. This will fail, only
   * `new Date('2020-01-01')` works.
   */
  getDate(value: string): Date {
    if (!value) {
      return;
    }

    const delimiter = this.placeholder
      .replace('yyyy', '')
      .replace('mm', '')
      .replace('dd', '')
      .substr(0, 1);

    const dateParts = value.split(delimiter);

    const placeholderParts = this.placeholder.split(delimiter);

    const y = placeholderParts.indexOf('yyyy');
    const m = placeholderParts.indexOf('mm');
    const d = placeholderParts.indexOf('dd');

    return new Date(
      Number(dateParts[y]),
      Number(dateParts[m]) - 1,
      Number(dateParts[d])
    );
  }
}

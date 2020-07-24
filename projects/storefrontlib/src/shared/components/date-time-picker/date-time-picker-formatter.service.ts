import { Injectable } from '@angular/core';

/**
 * Service responsible for converting date-like strings to/from formats compatible with the `<input type="datetime-local">`
 * HTML element and the `Date` string compatible with the OCC backend.
 *
 * Date values used are relative to the local timezone of the user.
 */
@Injectable({
  providedIn: 'root',
})
export class DateTimePickerFormatterService {
  /**
   * Convert date string into a string format compatable with the browser's native `<input type="datetime-local">` HTML element.
   * @param value: date string to convert
   *
   * @example
   * With UTC-0 local offset, `toNative('2010-01-01T00:00+0000')` returns `'2010-01-01T00:00'`.
   */
  toNative(value: string): string {
    return value
      ? this.formatDateStringWithTimezone(
          value,
          this.getLocalTimezoneOffset(true)
        )
      : null;
  }

  /**
   * Convert datetime-local native string into a datetime format format compatable with OCC.
   * @param value: datetime-local string to convert
   *
   * @example
   * With UTC-0 locale offset, `toModel('2010-01-01T00:00')` returns `'2010-01-01T00:00:00+00:00'`.
   */
  toModel(value: string): string {
    return value ? this.toDateTimeOccFormat(value) : null;
  }

  /**
   * Returns the local timezone in a format that can be appended to a date-like string.
   * @param invert (default: false): returns the opposite operator relative to the local timezone
   *
   * @example
   * When locale is set to a CEST timezone, `getLocalTimezoneOffset()` returns '+02:00'
   * and `getLocalTimezoneOffset(true)` returns '-02:00'
   */
  protected getLocalTimezoneOffset(invert?: boolean): string {
    const offset = new Date().getTimezoneOffset() * -1;
    const hours = Math.abs(Math.floor(offset / 60))
      .toString()
      .padStart(2, '0');
    const minutes = (offset % 60).toString().padStart(2, '0');
    return offset >= 0
      ? !invert
        ? `+${hours}:${minutes}`
        : `-${hours}:${minutes}`
      : !invert
      ? `-${hours}:${minutes}`
      : `+${hours}:${minutes}`;
  }

  /**
   * Format datetime-local string into a format compatable with OCC.
   * @param value: datetime-local string to convert
   *
   * @example
   * With UTC-0 locale offset, `toDateTimeOccFormat('2010-01-01T00:00')` returns `'2010-01-01T00:00:00+00:00'`.
   */
  protected toDateTimeOccFormat(value: string) {
    return `${value}:00${this.getLocalTimezoneOffset()}`;
  }

  /**
   * Format date string into a format compatable with the browser's native `<input type="datetime-local">` HTML element.
   * @param dateString: date string to convert
   * @param offset: offset to append to date string
   *
   * @example
   * With UTC-0 local offset, `formatDateStringWithTimezone('2010-01-01T00:00+0000', '+00:00')` returns `'2010-01-01T00:00+00:00'`.
   */
  protected formatDateStringWithTimezone(
    dateString: string,
    offset: string
  ): string {
    return new Date(dateString.replace('+0000', offset))
      .toISOString()
      .substring(0, 16);
  }
}

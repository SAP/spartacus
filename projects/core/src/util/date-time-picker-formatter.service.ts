import { Injectable } from '@angular/core';

/**
 * Service responsible for converting date-like strings to/from formats compatible with the `<input type="datetime-local">`
 * HTML element and valid strings compatible with the `Date` object.
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
   * Convert datetime-local native string into a valid datetime string.
   * @param value: datetime-local string to convert
   *
   * @example
   * With UTC-0 locale offset, `toModel('2010-01-01T00:00')` returns `'2010-01-01T00:00:00+00:00'`.
   */
  toModel(value: string): string {
    return value ? `${value}:00${this.getLocalTimezoneOffset()}` : null;
  }

  /**
   * Convert date-local native string into a valid datetime string with current time.
   * @param value: datetime-local string to convert
   *
   * @example
   * With UTC-0 locale offset, `toModel('2010-01-01')` returns `'2010-01-01T00:00:00+00:00'`.
   */
  toModelWithTime(value: string): string {
    const currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    return value
      ? `${value.split('T')[0]}T${currentTime}${this.getLocalTimezoneOffset()}`
      : null;
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
    const sign = offset >= 0 ? (invert ? `-` : `+`) : invert ? `+` : `-`;
    return `${sign}${hours}:${minutes}`;
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

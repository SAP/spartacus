export class TimeUtils {
  /**
   * Returns the local timezone in a format that can be appended to a date-like string.
   * @param invert (default: false): returns the opposite operator relative to the local timezone
   *
   * @example
   * When locale is set to a CEST timezone, `getLocalTimezoneOffset()` returns '+02:00'
   * and `getLocalTimezoneOffset(true)` returns '-02:00'
   */
  static getLocalTimezoneOffset(invert?: boolean): string {
    const offset = new Date().getTimezoneOffset() * -1;
    const hours = Math.abs(Math.floor(offset / 60))
      .toString()
      .padStart(2, '0');
    const minutes = (offset % 60).toString().padStart(2, '0');
    const sign = offset >= 0 ? (invert ? `-` : `+`) : invert ? `+` : `-`;
    return `${sign}${hours}:${minutes}`;
  }

  static convertDateToDatetime(date: string, endOfDay?: boolean): string {
    return `${date}T${
      !endOfDay ? '00:00:00' : '23:59:59'
    }${TimeUtils.getLocalTimezoneOffset()}`;
  }

  static convertDatetimeToDate(datetime: string): string {
    return new Date(
      `${datetime.substring(0, 19)}${TimeUtils.getLocalTimezoneOffset(true)}`
    )
      .toISOString()
      .substring(0, 10);
  }
}

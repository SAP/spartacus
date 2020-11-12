import { Injectable } from '@angular/core';
import { Budget, Converter, Occ } from '@spartacus/core';

@Injectable({ providedIn: 'root' })
export class OccBudgetSerializer implements Converter<Budget, Occ.Budget> {
  constructor() {}

  convert(source: Budget, target?: Occ.Budget): Occ.Budget {
    if (target === undefined) {
      target = { ...(source as any) };
    }

    if (source.startDate) {
      target.startDate = this.convertDate(source.startDate);
    }

    if (source.endDate) {
      target.endDate = this.convertDate(source.endDate, true);
    }

    return target;
  }

  /**
   * Adds the current timestamp (including timezone offset) to a date string in the format YYYY-mm-dd
   * @Example
   * Converts 2021-10-15 to 2021-10-15T15:38:05-05:00
   */
  private convertDate(date: string, endOfDay?: boolean): string {
    return `${date}T${
      !endOfDay ? '00:00:00' : '23:59:59'
    }${this.getLocalTimezoneOffset()}`;
  }

  /**
   * Returns the local timezone in a format that can be appended to a date-like string.
   * @param invert (default: false): returns the opposite operator relative to the local timezone
   *
   * @example
   * When locale is set to a CEST timezone, `getLocalTimezoneOffset()` returns '+02:00'
   * and `getLocalTimezoneOffset(true)` returns '-02:00'
   */
  private getLocalTimezoneOffset(invert?: boolean): string {
    const offset = new Date().getTimezoneOffset() * -1;
    const hours = Math.abs(Math.floor(offset / 60))
      .toString()
      .padStart(2, '0');
    const minutes = (offset % 60).toString().padStart(2, '0');
    const sign = offset >= 0 ? (invert ? `-` : `+`) : invert ? `+` : `-`;
    return `${sign}${hours}:${minutes}`;
  }
}

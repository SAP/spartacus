import { Injectable } from '@angular/core';
import { Converter, Occ, Budget } from '@spartacus/core';

@Injectable()
export class OccBudgetNormalizer implements Converter<Occ.Budget, Budget> {
  convert(source: Occ.Budget, target?: Budget): Budget {
    if (target === undefined) {
      target = {
        ...(source as any),
      };
    }

    if (source.startDate) {
      target.startDate = new Date(
        `${source.startDate.substring(0, 19)}${this.getLocalTimezoneOffset(
          true
        )}`
      )
        .toISOString()
        .substring(0, 10);
    }

    if (source.endDate) {
      target.endDate = new Date(
        `${source.endDate.substring(0, 19)}${this.getLocalTimezoneOffset(true)}`
      )
        .toISOString()
        .substring(0, 10);
    }

    return target;
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
